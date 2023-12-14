const User=require('../models/userModel')
const jwt=require('jsonwebtoken')
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const createToken=(_id)=> {
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'50d'})
}

const loginUser=async (req,res)=>{
  const {email,password}=req.body
    try{
     const user=await User.login(email,password)
     const token=createToken(user._id)
     res.status(200).json({email,token,role:user.role})
   }catch (error) {
    res.status(400).json({error:error.message})
}}

const signupUser = async (req, res) => {
    const { email, password, role, confirmPassword } = req.body;
    console.log('Request Body:', req.body);
    try {
        const user = await User.signup(email, password, confirmPassword, role);
        const profile = await UserProfile.create({ userId: user._id, /* other profile fields */ });
        const token = createToken(user._id, profile._id);
        res.status(200).json({ email, token, role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports={
    signupUser,loginUser
}
