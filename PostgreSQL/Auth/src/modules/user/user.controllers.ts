import { Request,Response } from "express"
import userService from "./user.service";
import bcrypt from 'bcrypt'


export const register = async (req:Request,res : Response) => {
  try {
      const {name,email,password} = req.body;
      const findUser = await userService.readOnlyUser(email);
      if(findUser){
        return res.status(400).json({
          message : "User Already Exist",
          success : false
        })
      }
      let saltRounds = 10
      let hashedPassword = await bcrypt.hash(password,saltRounds);
      await userService.createUser({name,email,hashedPassword})
      return res.status(200).json({
        message : "User created successfully",
        success : true
      })
  } catch (err : any) {
    return res.status(500).json({
      message : err.message,
      success : false
    })
  }
}
export const login = async (req:Request,res : Response) => {
  try {
      const {email,password} = req.body;
      const findUser = await userService.readOnlyUser(email);
      if(!findUser){
        return res.status(400).json({
          message : "User not found",
          success : false
        })
      }
      let passwordCompared = await bcrypt.compare(password,findUser.password)
      if(!passwordCompared){
        return res.status(401).json({
          message : "Invalid Credentials",
          success : false
        })
      }
      return res.status(200).json({
        message : "User login successfully",
        success : true
      })
  } catch (err : any) {
    return res.status(500).json({
      message : err.message,
      success : false
    })
  }
}
export const getAllUser = async (req:Request,res : Response) => {
  try {
      const allUsers = await userService.readAllUser()
      return res.status(200).json({
        data : allUsers,
        success : true
      })
  } catch (err : any) {
    return res.status(500).json({
      message : err.message,
      success : false
    })
  }
}