import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 1020,
     },
},
{
    timestamps: true
})

//module.exports = mongoose.model("Users", userSchema)

const User = mongoose.model("Users", userSchema);

export default User;