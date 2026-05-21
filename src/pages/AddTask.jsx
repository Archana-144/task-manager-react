import { useLocation, useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";

import { UserContext } from "../context/UserContext";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import "../App.css";

function AddTask() {

  const navigate = useNavigate();

  const location = useLocation();

  const {

    user,

    addTask,

    updateTask,

    tasks

  } = useContext(UserContext);

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

    // EDIT MODE

    if (existingTask) {

      const updatedTask = {

        ...existingTask,

        task,

        status,

        assignedTo,

      };

      updateTask(updatedTask);

      alert(

        "Task Updated Successfully"

      );

    }

    // ADD MODE

    else {

      const newTask = {

        id: Math.floor(Math.random() * 1000),

        task,

        status,

        assignedTo,

      };

      addTask(newTask);

      alert(

        "Task Added Successfully"

      );

    }

    navigate("/home");

  }

  return (

    <div>

      <Navbar />

      {/* PAGE */}

      <div className="add-task-page">

        {/* HEADER */}

        <div className="add-task-header">

          <h1>

            {

              existingTask

                ? "Edit Task"

                : "Add New Task"

            }

          </h1>

          <p>

            Fill in the details to create a new task

          </p>

        </div>

        {/* CARD */}

        <div className="add-task-container">

          <div className="add-task-card">

            {/* FORM */}

            <form onSubmit={handleSubmit}>

              {/* TASK NAME */}

              <label>

                TASK NAME *

              </label>

              <input
                type="text"
                placeholder="Describe the task..."
                value={task}
                onChange={(e) =>
                  setTask(e.target.value)
                }
              />

              {/* STATUS + ASSIGNED */}

              {/* STATUS */}

<label>

  STATUS *

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

{/* ASSIGN */}

<label>

  ASSIGN TO *

</label>

<input
  type="text"
  placeholder="Enter team member's name"
  value={assignedTo}
  onChange={(e) =>
    setAssignedTo(e.target.value)
  }
/>

              {/* TASK ID */}

              <div className="task-id-preview">

                Task ID will be:

                <span>

                  #

                  {

                    existingTask

                      ? existingTask.id

                      : tasks?.length + 1 || 1

                  }

                </span>

              </div>

              {/* BUTTONS */}

              <div className="edit-buttons">

                <button
                  className="save-btn"
                  type="submit"
                >

                  {

                    existingTask

                      ? "✓ Save"

                      : "+ Add Task"

                  }

                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    navigate("/home")
                  }
                >

                  Cancel

                </button>

              </div>

              {/* MESSAGE */}

              <p className="error-message">

                {message}

              </p>

            </form>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default AddTask;