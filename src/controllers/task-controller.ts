import { Request, Response } from "express"
import { AuthRequest } from "../middleware"
import Task from "../models/task-models"
import { ITask } from "../types"

export const getAllTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user
    const tasks = await Task.find({
      user: userId,
    })
    res.send(tasks)
  } catch (error) {
    console.log("error in getAllTasks", error)
    res.send({ error: "Error while fetching tasks" })
    throw error
  }
}

export const getAllTasksByCategory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user
    const { id } = req.params
    const tasks = await Task.find({
      user: userId,
      categoryId: id,
    })
    res.send(tasks)
  } catch (error) {
    console.log("error in getAllTasksByCategory", error)
    res.send({ error: "Error while fetching tasks" })
    throw error
  }
}

export const getAllCompletedTasks = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user
    const tasks = await Task.find({
      user: userId,
      isCompleted: true,
    })
    res.send(tasks)
  } catch (error) {
    console.log("error in getAllCompletedTasks", error)
    res.send({ error: "Error while fetching tasks" })
    throw error
  }
}

export const getTasksForToday = async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const userId = req.user;
      const todaysISODate = new Date();
      todaysISODate.setHours(0, 0, 0, 0);
  
      // Create a range query for the entire day
      const tomorrowISODate = new Date(todaysISODate);
      tomorrowISODate.setDate(tomorrowISODate.getDate() + 1);
  
      const tasks = await Task.find({
        user: userId,
        date: {
          $gte: todaysISODate.toISOString(),
          $lt: tomorrowISODate.toISOString(),
        },
      });
  
      res.send(tasks);
    } catch (error) {
      console.log("error in getTasksForToday", error);
      res.send({ error: "Error while fetching tasks" });
      throw error;
    }
  };

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user
    const { name, date, categoryId, }: ITask = req.body

    const task = await Task.create({
      name,
      date,
      categoryId,
      user: userId,
    })
    res.send(task)
  } catch (error) {
    console.log("error in createTask", error)
    res.send({ error: "Error while creating task" })
    throw error
  }
}

export const toggleTaskStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { isCompleted } = req.body
    const { id } = req.params

    const task = await Task.updateOne(
      {
        _id: id,
      },
      {
        isCompleted,
      }
    )
    res.send({ message: "Task status updated" })
  } catch (error) {
    console.log("error in toggleTaskStatus", error)
    res.send({ error: "Error while toggling status task" })
    throw error
  }
}

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    await Task.deleteOne({
      _id: id,
    })
    res.send({ message: "Task deleted" })
  } catch (error) {
    console.log("error in deleteTask", error)
    res.send({ error: "Error while deleting task" })
    throw error
  }
}

export const editTask = async (req: AuthRequest, res: Response) => {
  try {
    const { _id, categoryId, date, name }: ITask = req.body
    await Task.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          categoryId,
          date,
        },
      }
    )
    res.send({ message: "Task updated successfully" })
  } catch (error) {
    console.log("error in editTask", error)
    res.send({ error: " Error while updating the task" })
    throw error
  }
}