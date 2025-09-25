import { User } from './../../../../PrismaYT/generated/prisma/index.d';
import { Request, Response } from "express";
import todoService from "./todo.service";

// ============================ CREATE ============================
export const create = async (req: Request, res: Response) => {
  try {
    // console.log(req.)
    const { desc} = req.body;
    let {userId} = (req as any);

    const user = await todoService.findUniqueUser(userId)
    console.log('user',user)
    if(!user)
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
 
    const savedData = await todoService.createTodo(desc,userId);

    return res.status(200).json({
      data : savedData,
      message: "Todo Added",
      success: true,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
// ============================ READ ============================
export const readAllTodos = async (req: Request, res: Response) => {
  try {
    const {userId} = (req as any);
    const allTodos = await todoService.readAllTodos(userId)
    return res.status(200).json({
      data : allTodos,
      success: true,
    });

  } catch (err: any) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

      // ============================ DELETE ============================
      export const deleteTodo = async (req: Request, res: Response) => {
        try {
          // console.log(req.)
          const todoId = Number(req.params.id);
          let {userId} = (req as any);
          if (isNaN(todoId)) {
            return res.status(400).json({ message: "Invalid todo id" });
          }
          const todo = await todoService.findUniqueUser(todoId)
          if(!todo)
            return res.status(404).json({
              message: "Todo not found",
              success: false,
            });
      
          const deletedTodo = await todoService.deleteTodo(todoId,userId)
          if(!deleteTodo)
            return res.status(400).json({
              message: "Todo with current user is not found",
              success: false,
            });
      
          return res.status(200).json({
            deletedTodo,
            message: "Todo Deleted",
            success: true,
          });
        } catch (err: any) {
          return res.status(500).json({ message: err.message, success: false });
        }
      };
      // ============================ UPDATE ============================
      export const updateTodo = async (req: Request, res: Response) => {
        try {
          // console.log(req.)
          const {description} = req.body;
          const todoId = Number(req.params.id);
          let {userId} = (req as any);
          if (isNaN(todoId)) {
            return res.status(400).json({ message: "Invalid todo id" });
          }
          const todo = await todoService.findUniqueUser(todoId);
          if(!todo || !description)
          {
            return res.status(404).json({
              message: `Something not found`,
              success: false,
            });
          }
      
          const updateTodo = await todoService.updateTodo(todoId,description,userId)
          if(!updateTodo)
            return res.status(400).json({
              message: "Todo with current user is not found",
              success: false,
            });
      
          return res.status(200).json({
            updateTodo,
            message: "Todo Update Successfully",
            success: true,
          });
        } catch (err: any) {
          return res.status(500).json({ message: err.message, success: false });
        }
      };