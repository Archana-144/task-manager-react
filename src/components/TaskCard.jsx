import "../App.css";

function TaskCard({

  taskData,

  deleteTask,

  updateStatus,

  editTask

}) {

  return (

    <div className="task-card">

      {/* TASK ID */}

      <p className="task-id">

        Task #{taskData.id}

      </p>

      {/* TASK TITLE */}

      <h2 className="task-title">

        {taskData.task}

      </h2>

      {/* STATUS + ASSIGNED */}

      <div className="task-bottom">

        {/* STATUS */}

        <select

          className={`status ${

            taskData.status === "Completed"? "completed" : taskData.status === "Hold"? "hold" : "inprogress"
 

          }`}

          value={taskData.status}

          onChange={(e) =>

            updateStatus(

              taskData.id,

              e.target.value

            )

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

      </div>

      {/* ASSIGNED USER */}

      <p className="assigned">

        Assigned To :

        {" "}

        <strong>

          {taskData.assignedTo || "Not Assigned"}

        </strong>

      </p>

      {/* BUTTONS */}

      <div className="task-actions">

        {/* EDIT */}

        <button

          className="edit-btn"

          onClick={() => editTask(taskData)}

        >

          Edit

        </button>

        {/* DELETE */}

        <button

          className="delete-btn"

          onClick={() =>

            deleteTask(taskData.id)

          }

        >

          Delete

        </button>

      </div>

    </div>

  );

}

export default TaskCard;