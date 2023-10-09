import Tasks from "../database/models/tasks.mjs";
import mongoose from "mongoose";
export const addTask = (taskObj) => {
  const response = Tasks.create(taskObj);
  return response;
};

export const viewAllTasks = () => {
  const response = Tasks.find();
  return response;
};
export const editTask = async (editData, taskId) => {
  const response = await Tasks.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(taskId) },
    { ...editData },
    {
      new: true,
    }
  );
  return response;
};

export const deleteTask = (taskId) => {
  const response = Tasks.deleteOne({
    _id: new mongoose.Types.ObjectId(taskId),
  });
  return response;
};
