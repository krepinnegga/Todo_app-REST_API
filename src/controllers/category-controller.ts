import Category from '../models/category-models';
import { Request, Response } from 'express';
import Task from '../models/task-models';
import { ICategory } from '../types';
import { AuthRequest } from '../middleware';

export const getAllCategories = async (req: AuthRequest, res: Response) => {
    try {
       const { user } = req
       const categories = await Category.find({
        user: user,
       })
       return res.status(200).send(categories) 
    } catch (error) {
        console.log("error in getting Collections", error)
        throw(error);
    }
}

export const createCategory = async (req: AuthRequest, res: Response ) => {
    try {
      const { color, icon, name }: ICategory = req.body
      const { user } = req
  
      const category = await Category.create({
        color,
        icon,
        name,
        user,
      })
      res.status(200).send(category)
    } catch (error) {
      console.log("error in createCategory", error)
      res.send({ error: "Something went wrong" })
      throw error
    }
  }

  export const deleteCategory = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      await Task.deleteMany({
        categoryId: id,
      })
      const category = await Category.deleteOne({
        _id: id,
      })
      res.send({ message: "Category deleted successfully" });
    } catch (error) {
      console.log(error)
      res.send({ error: "Error in deleting the category" });
      throw error;
    }
  };
  
  export const updateCategory = async ( req: AuthRequest, res: Response ) => {
    try {
      const { _id, color, icon, isEditable, name }: ICategory = req.body
      await Category.updateOne(
        {
          _id
        },
        {
          $set: {
            name,
            color,
            icon,
            isEditable,
          },
        }
      );
      res.send({ message: "Category updated successfully" })
    } catch (error) {
      console.log("error in updateCategory", error)
      res.send({ error: "Error in updating the category" })
      throw error
    }
  }