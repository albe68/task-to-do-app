import React, { useState, useEffect } from "react";
import { addTask, getAllTasks, deleteTask, editTask } from "../api/service";
import "../assets/index.css";

function IndexPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 8;

  const userInput = (e) => setTitle(e.target.value);
  const userInput2 = (e) => setDescription(e.target.value);

  useEffect(() => {
    const listTasks = async () => {
      try {
        const response = await getAllTasks();
        const pay = response.data.data;
        setTasks(pay);
      } catch (err) {
        console.log("error while listing tasks", err);
      }
    };
    listTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, description };
    setTitleError("");
    setDescriptionError("");
    if (title.trim() === "") {
      setTitleError("Title is required ");
    }
    if (description.trim() === "") {
      setDescriptionError("Description is required");
    }
    try {
      const response = await addTask(payload);

      setTasks((prevTasks) => [...prevTasks, response.data.data]);
      setTitle("");
      setDescription("");
    } catch (err) {
      if (err.response.status === 409) {
        setTitleError("This task is already there ");
      }
    }
  };

  const deleteTasks = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const startEditing = (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    if (taskToEdit) {
      setEditingTask(taskId);
      setEditedTitle(taskToEdit.title);
      setEditedDescription(taskToEdit.description);
    }
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditedTitle("");
    setEditedDescription("");
  };

  const saveEditedTask = async () => {
    const updatedTask = {
      title: editedTitle,
      description: editedDescription,
    };

    try {
      const response = await editTask(editingTask, updatedTask);
      if (response.data) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === editingTask ? { ...task, ...response.data.data } : task
          )
        );
      } else {
        console.error("Invalid response from editTask:", response);
        titleError;
      }
    } catch (error) {
      console.error("Error while editing task:", error);
    }

    setEditingTask(null);
    setEditedTitle("");
    setEditedDescription("");
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h1>TASK ASSIGN APP</h1>
      <form
        onSubmit={handleSubmit}
        className="form-container"
        id="form"
        name="form"
      >
        <input
          value={title}
          type="text"
          onChange={userInput}
          placeholder="Try typing 'Pay bills today'"
          className="title-field"
        ></input>
        {titleError && <p className="error-message">{titleError}</p>}
        <input
          value={description}
          type="text"
          onChange={userInput2}
          placeholder="Describe about your task"
          className="description-field"
        ></input>
        {descriptionError && (
          <p className="error-message">{descriptionError}</p>
        )}

        <button type="submit" className="submit">
          Add Task
        </button>
      </form>
      <div className="list-courses">
        {currentTasks.length === 0 ? (
          <p className="no-tasks">No tasks available</p>
        ) : (
          currentTasks?.map((task) => (
            <div key={task._id} className="indvidual-course">
              {editingTask === task._id ? (
                <>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="edit-input-title"
                  />
                  <input
                    type="text"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="edit-input-description"
                  />
                  <div className="button-group">
                    <button onClick={saveEditedTask} className="save-btn">
                      Save
                    </button>
                    <button onClick={cancelEditing} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1>{task.title}</h1>
                  <p>{task.description}</p>
                  <button onClick={() => startEditing(task._id)}>Edit</button>
                  <button onClick={() => deleteTasks(task._id)}>Delete</button>
                </>
              )}
            </div>
          ))
        )}
      </div>
      {/* Pagination*/}
      <div className="pagination">
        {tasks.length > tasksPerPage && (
          <ul className="pagination-list horizontal">
            {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map(
              (item, index) => (
                <li key={index} className="page-item">
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`page-link ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </>
  );
}

export default IndexPage;
