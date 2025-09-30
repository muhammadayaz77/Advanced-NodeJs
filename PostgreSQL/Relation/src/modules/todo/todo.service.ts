import prisma from "../../config/config.db";
import { CreateUserDTO } from "./todo.types";


class userService {
  static async findUniqueUser(id : number){
    let findTodo = await prisma.user.findUnique({
      where : {
        id,
      }
    })
    return findTodo;
  }
  static async findUniqueTodo(id : number){
    let findTodo = await prisma.todo.findUnique({
      where : {
        id,
      }
    })
    return findTodo;
  }
  static async createTodo(desc : string,userId : number){
    const todo = await prisma.todo.create({
      data: {
        description : desc,
        user: { connect: { id: Number(userId) } }, // connect todo with user
      },
    });
    return todo
  }
  static async readAllTodos(userId:number){
    let AllTodos = await prisma.todo.findMany({
      where : {
        userId
      }
    })
    return AllTodos;
  }
  static async deleteTodo(todoId:number,userId : number){
    let AllTodos = await prisma.todo.delete({
      where : {
        id : todoId,
        userId
      }
    })
    return AllTodos;
  }
  static async updateTodo(todoId: number, description: string, userId: number) {
    const result = await prisma.todo.updateMany({
      where: {
        id: todoId,
        userId: userId,
      },
      data: {
        description,
      },
    });
  
    if (result.count === 0) {
      throw new Error("Todo not found or you don’t have permission to update it.");
    }
  
    return result;
  }
  
}

export default userService