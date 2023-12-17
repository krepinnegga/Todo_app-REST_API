import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from '../models/user-models';
import { IUser } from "../types";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

const getUserToken = (_id: string|Types.ObjectId) => {
    const authenticatedUserToken = jwt.sign({ _id }, "express",{
      expiresIn: "7d",
    })
    return authenticatedUserToken;
}

export const createUser = async (req: Request, res: Response) => {
    try {
       const { name, email, password } = req.body;
       
       const existingUser = await User.findOne({ email });

       if (existingUser) return res.status(409).send({ status: false, msg: 'Email Already Exist' });
       
       // Encrypting Password received
       const salt = await bcrypt.genSalt(12);
       const hashedPassword = await bcrypt.hash(password, salt);
       
       const user = new User({
         name,
         email,
         password: hashedPassword
       });

       const newUser = await user.save();

       res.status(200).send({success: true, data:{ id: newUser._id}});

    } catch (error) {
        console.log('error creating user', error);
        throw error;
    }
}


export const loginUser = async (req: Request, res: Response) => {
  try {
    const {email, password,}: IUser = req.body;
    
    const existingUser = await User.findOne({ email });
    
    if (!existingUser) return res.status(409).send({ status: false, msg: 'User Does not Exist' });

    const isPasswordIdentical = await bcrypt.compare(
      password, 
      (
       existingUser
      ).password
    )

    if(isPasswordIdentical) {
      const token = getUserToken((existingUser)._id)
      return res.status(200).send({
        token,
        user: {
          email: existingUser.email,
          name: existingUser.name
        }
      })
    }  else {
      return res.status(400).send({msg: "wrong credentials"});
    }
  } catch (error) {
    console.log(error)
  }
}