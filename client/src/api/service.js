import axios from "axios";
const URL = "http://localhost:8080/";
const api = axios.create({ baseURL: URL });
import { END_POINTS } from "../api/endpoints";

export const getAllTasks = async () => {
  const response = await api.get(`${END_POINTS.VIEW_ALL_TASKS}`);
  return response;
};

export const addTask = async (addData) => {
  const response = await api.post(`${END_POINTS.ADD_TASK}`, addData);

  return response;
};

export const editTask = async (taskId, updated) => {
  const response = await api.patch(
    `${END_POINTS.EDIT_TASK}/${taskId}`,
    updated
  );
  return response;
};

export const deleteTask = async (taskId) => {
  await api.delete(`${END_POINTS.DELETE_TASK}/${taskId}`);
};
