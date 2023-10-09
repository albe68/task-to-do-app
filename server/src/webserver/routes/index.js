import taskRoute from "./task.mjs";
export const routes = (app) => {
  app.use("/api/v1", taskRoute());
};
