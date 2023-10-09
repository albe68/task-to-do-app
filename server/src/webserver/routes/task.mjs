import express from "express";
import {
  addTask,
  editTask,
  deleteTask,
  viewAllTasks,
} from "../../database/dbRepository.mjs";
const taskRoute = () => {
  const router = express.Router();

  router.post("/add-task", async (req, res) => {
    try {
      const { title, description } = req.body;
      const testObj = { title, description };
      const resp = await addTask(testObj);
      res.status(200).json({
        message: "Task added successfully",
        data: resp,
      });
    } catch (err) {
      res.status(409).json({
        error: err?.message,
      });
    }
  });

  router.get("/get-all-tasks", async (req, res) => {
    try {
      const resp = await viewAllTasks();
      res.status(200).json({
        message: "Task retrived successfully",
        data: resp,
      });
    } catch (err) {
      res.status(400).json({
        error: err?.message,
      });
    }
  });

  router.patch("/edit-task/:taskId", async (req, res) => {
    try {
      const { title, description } = req.body;
      const { taskId } = req.params;
      const editData = { title, description };

    
      if (!taskId || !editData) {
        res.send(400).json({
          status: "failed",
          message: "provide valid data",
        });
      }
      const resp = await editTask(editData, taskId);
      res.status(200).json({
        status: "success",
        message: "Task updated successfully",
        data: resp,
      });
    } catch (err) {
      console.log(err?.message);
      res.status(400).json({
        error: err?.message,
      });
    }
  });

  router.delete("/delete-task/:taskId", async (req, res) => {
    try {
      const { taskId } = req.params;
      if (!taskId) {
        res.send(400).json({
          status: "failed",

          message: "provide taskId",
        });
      }

      const resp = await deleteTask(taskId);
      res.status(200).json({
        status: "success",
        message: "task removed successfully",
        data: resp,
      });
    } catch (err) {
      res.status(400).json({
        error: err?.message,
      });
    }
  });
  return router;
};

export default taskRoute;
