import TodoList from "../models/todolist.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (req.params.userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to create this todoList")
      );
    }
    if (title.length > 50) {
      return next(
        errorHandler(403, "Title should not be greater then 50 words")
      );
    }

    const newTodoList = new TodoList({
      userId: req.params.userId,
      title,
      description,
    });

    await newTodoList.save();

    res.status(200).json(newTodoList);
  } catch (error) {
    return next(error);
  }
};

export const getList = async (req, res, next) => {
  try {
    const lists = await TodoList.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(lists);
  } catch (error) {
    return next(error);
  }
};

export const deleteList = async (req, res, next) => {
  try {
    if (req.params.userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to delete this todoList")
      );
    }
    await TodoList.findByIdAndDelete(req.params.listId);

    res.status(200).json("The Todo List is deleted");
  } catch (error) {
    return next(error);
  }
};

export const editList = async (req, res, next) => {
  try {
    if (req.params.userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to edit this todoList")
      );
    }
    const updateList = await TodoList.findByIdAndUpdate(
      req.params.listId,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      },
      { new: true }
    );

    res.status(200).json(updateList);
  } catch (error) {
    return next(error);
  }
};
