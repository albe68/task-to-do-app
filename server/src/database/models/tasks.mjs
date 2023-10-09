import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please insert Title"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please insert description"],
      unique: true,
    },
  },
  { timestamps: true }
);

const Tasks = mongoose.model("Task", taskSchema, "task");
export default Tasks;
