import { useLocation, useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";

import { UserContext } from "../context/UserContext";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import "../App.css";

function AddTask() {

  const navigate = useNavigate();

  const location = useLocation();

  const { user, addTask } = useContext(UserContext);

  // REDIRECT IF NOT LOGGED IN

  useEffect(() => {

    if (!user) {

      navigate("/");

    }

  }, [user, navigate]);

  // EDIT TASK DATA

  const existingTask = location.state;

  // STATES

  const [task, setTask] = useState(

    existingTask?.task || ""

  );

  const [status, setStatus] = useState(

    existingTask?.status || "In Progress"

  );

  const [assignedTo, setAssignedTo] = useState(

    existingTask?.assignedTo || ""

  );

  const [message, setMessage] = useState("");

  // SUBMIT FUNCTION

  function handleSubmit(e) {

    e.preventDefault();

    // VALIDATION

    if (

      task === "" ||

      assignedTo === ""

    ) {

      setMessage(

        "All fields are required"

      );

      return;
    }

    // CREATE NEW TASK

    const newTask = {

      id: Date.now(),

      task,

      status,

      assignedTo,

    };

    addTask(newTask);

    // SUCCESS

    alert(

      existingTask

        ? "Task Updated Successfully"

        : "Task Added Successfully"

    );

    navigate("/home");

  }

  return (

    <div>

      <Navbar />

      {/* PAGE */}

      <div className="add-task-container">

        <div className="add-task-card">

          <h1>

            {

              existingTask

                ? "Edit Task"

                : "Add New Task"

            }

          </h1>

          {/* FORM */}

          <form onSubmit={handleSubmit}>

            {/* TASK NAME */}

            <label>

              TASK NAME

            </label>

            <input
              type="text"
              placeholder="Enter task name"
              value={task}
              onChange={(e) =>
                setTask(e.target.value)
              }
            />

            {/* STATUS */}

            <label>

              STATUS

            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >

              <option value="In Progress">

                In Progress

              </option>

              <option value="Completed">

                Completed

              </option>

              <option value="Hold">

                Hold

              </option>

            </select>

            {/* ASSIGNED USER */}

            <label>

              ASSIGNED USER

            </label>

            <input
              type="text"
              placeholder="Assign task to user"
              value={assignedTo}
              onChange={(e) =>
                setAssignedTo(e.target.value)
              }
            />

            {/* BUTTON */}

            <button
              className="login-btn"
              type="submit"
            >

              {

                existingTask

                  ? "Update Task"

                  : "Add Task"

              }

            </button>

            {/* MESSAGE */}

            <p className="error-message">

              {message}

            </p>

          </form>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default AddTask;