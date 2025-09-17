
import prisma from "../../config/config.db";
import { CreateUserDTO } from "./user.types";

  



class userService {
  static async readOnlyUser(email : string){
    let findUser = await prisma.user.findUnique({
      where : {
        email,
      }
    })
    return findUser;
  }
  static async createUser(datas:CreateUserDTO){
    await prisma.user.create({
      data : {
        name : datas.name,
        email : datas.email,
        password : datas.hashedPassword
      }
    })
  }
  static async readAllUser(){
    let AllUser = await prisma.user.findMany()
    return AllUser;
  }
}

export default userService