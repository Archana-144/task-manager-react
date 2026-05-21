import { useState } from "react";

import "../App.css";

function TaskCard({

  taskData,

  deleteTask,

  updateStatus,

  editTask,

  saveEditedTask

}) {

  const [isEditing, setIsEditing] =

    useState(false);

  const [editedTask, setEditedTask] =

    useState(taskData.task);

  const [editedStatus, setEditedStatus] =

    useState(taskData.status);

  const [editedAssigned, setEditedAssigned] =

    useState(taskData.assignedTo);

  return (

    <div className="task-card">

      {

        isEditing ? (

          <div className="inline-edit">

            {/* TASK ID */}

            <p className="edit-task-id">

              #{taskData.id}

            </p>

            {/* TASK NAME */}

            <label>

              TASK NAME

            </label>

            <input
              type="text"
              value={editedTask}
              onChange={(e) =>
                setEditedTask(
                  e.target.value
                )
              }
              className="edit-input"
            />

            {/* STATUS + ASSIGNED */}

            <div className="edit-row">

              {/* STATUS */}

              <div className="edit-group">

                <label>

                  STATUS

                </label>

                <select
                  value={editedStatus}
                  onChange={(e) =>
                    setEditedStatus(
                      e.target.value
                    )
                  }
                  className="edit-select"
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

              </div>

              {/* ASSIGNED */}

              <div className="edit-group">

                <label>

                  ASSIGNED TO

                </label>

                <input
                  type="text"
                  value={editedAssigned}
                  onChange={(e) =>
                    setEditedAssigned(
                      e.target.value
                    )
                  }
                  className="edit-input"
                  placeholder="Enter username"
                />

              </div>

            </div>

            {/* BUTTONS */}

            <div className="inline-buttons">

              <button
                className="save-inline-btn"
                onClick={() => {

                  saveEditedTask({

                    ...taskData,

                    task: editedTask,

                    status: editedStatus,

                    assignedTo:
                      editedAssigned,

                  });

                  setIsEditing(false);

                }}
              >

                ✓ Save

              </button>

              <button
                className="cancel-inline-btn"
                onClick={() =>
                  setIsEditing(false)
                }
              >

                ✕ Cancel

              </button>

            </div>

          </div>

        ) : (

          <>

            {/* TASK ID */}

            <p className="task-id">

              #{taskData.id}

            </p>

            {/* TASK TITLE */}

            <h2 className="task-title">

              {taskData.task}

            </h2>

            {/* STATUS + ASSIGNED */}

            <div className="task-status-assigned">

              {/* STATUS */}

              <div

                className={`status-badge ${

                  taskData.status ===

                  "Completed"

                    ? "completed"

                    : taskData.status ===

                      "Hold"

                    ? "hold"

                    : "inprogress"

                }`}

              >

                {taskData.status}

              </div>

              {/* ASSIGNED */}

              <p className="assigned-to">

                👤 {

                  taskData.assignedTo ||

                  "Unassigned"

                }

              </p>

            </div>

            {/* BUTTONS */}

            <div className="task-actions">

              <button
                className="edit-btn"
                onClick={() =>
                  setIsEditing(true)
                }
              >

                ✏ Edit

              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteTask(
                    taskData.id
                  )
                }
              >

                🗑 Delete

              </button>

            </div>

          </>

        )

      }

    </div>

  );

}

export default TaskCard;