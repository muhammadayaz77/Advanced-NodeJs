import { Request, Response } from "express"
import prisma from "../config/config.db"



export  const fetchData = async (req:Request,res:Response) => {
  try {
    let users = await prisma.user.findMany({})
    res.status(200).json({
      success : true,
      data : users
    })
  } catch (error) {
    res.status(500).send("Error found")
  }
}

// export const createUser = async (req:Request,res:Response) => {
//   try {
//     const {name,email,password} = req.body;
//     let users : any = await prisma.user.create({
//       data : {
//         name,
//         email,
//         password,
//       }
//     })
//     res.status(200).json({
//       success : true,
//       message : "User created successfully!",
//       data : users
//     })
//   } catch (error : any) {
//     res.status(500).send(error.message)
//   }
// }
export const deleteUser = async (req:Request,res:Response) => {
  try {
    let userId = req.params.id as string
    let findUser = await prisma.user.findUnique({
      where : {
        id : userId
      }
    })
    if(!findUser){
      return res.json({
        message : "User not found",
        success : false
      })
    }
    let users = await prisma.user.delete({
      where : {
        id : userId
      }
    })
    res.status(200).json({
      success : true,
      message : "User deleted successfully!",
      data : users
    })
  } catch (error : any) {
    res.status(500).send(error.message)
  }
}