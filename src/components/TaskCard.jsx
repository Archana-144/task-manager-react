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

        #{taskData.id}

      </p>

      {/* TASK TITLE */}

      <h2 className="task-title">

        {taskData.task}

      </h2>

      {/* STATUS + ASSIGNED ROW */}

      <div className="task-status-assigned">

        {/* STATUS BADGE */}

        <div

          className={`status-badge ${

            taskData.status === "Completed"

              ? "completed"

              : taskData.status === "Hold"

              ? "hold"

              : "inprogress"

          }`}

        >

          {taskData.status}

        </div>

        {/* ASSIGNED TO */}

        <p className="assigned-to">

          👤 {taskData.assignedTo || "Unassigned"}

        </p>

      </div>

      {/* BUTTONS */}

      <div className="task-actions">

        {/* EDIT */}

        <button

          className="edit-btn"

          onClick={() => editTask(taskData)}

        >

          - Edit

        </button>

        {/* DELETE */}

        <button

          className="delete-btn"

          onClick={() =>

            deleteTask(taskData.id)

          }

        >

         🗑 Delete

        </button>

      </div>

    </div>

  );

}

export default TaskCard;