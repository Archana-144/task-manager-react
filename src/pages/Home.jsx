import {

  useContext,

  useEffect,

  useState

} from "react";

import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import Loader from "../components/Loader";

import TaskCard from "../components/TaskCard";

import "../App.css";

function Home() {

  // CONTEXT API

  const {

    user,

    tasks,

    setTasks

  } = useContext(UserContext);

  // STATES

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [displayLimit] = useState(9);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // REDIRECT IF NOT LOGGED IN

  useEffect(() => {

    if (!user) {

      navigate("/");

    }

  }, [user, navigate]);

  // LOADER

  useEffect(() => {

    setTimeout(() => {

      setLoading(false);

    }, 500);

  }, []);

  // DELETE TASK

  function deleteTask(id) {

    const updatedTasks = tasks.filter(

      (task) => task.id !== id

    );

    setTasks(updatedTasks);

    localStorage.setItem(

      "tasks",

      JSON.stringify(

        updatedTasks.filter(

          (task) => task.id > 200

        )

      )

    );

  }

  // UPDATE STATUS

  function updateStatus(id, value) {

    const updatedTasks = tasks.map((task) => {

      if (task.id === id) {

        return {

          ...task,

          status: value,

        };

      }

      return task;

    });

    setTasks(updatedTasks);

    localStorage.setItem(

      "tasks",

      JSON.stringify(

        updatedTasks.filter(

          (task) => task.id > 200

        )

      )

    );

  }

  // EDIT TASK

  function editTask(task) {

    navigate("/add-task", {

      state: task,

    });

  }

  // SEARCH + FILTER

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =

      task.task
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =

      filter === "All"

        ? true

        : task.status === filter;

    return matchesSearch && matchesFilter;

  });

  // STATS

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(

    (task) => task.status === "Completed"

  ).length;

  const inProgressTasks = tasks.filter(

    (task) => task.status === "In Progress"

  ).length;

  const holdTasks = tasks.filter(

    (task) => task.status === "Hold"

  ).length;

  return (

    <div>

      <Navbar />

      <div className="home">

        {/* WELCOME */}

        <div className="welcome-card">

          <h1>

            Welcome

            {" "}

            <span>

              {user?.name}

            </span>

            👋

          </h1>

          <p>

            to Task Manager Dashboard

          </p>

        </div>

        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-card">

            <h1>{totalTasks}</h1>

            <p>Total Tasks</p>

          </div>

          <div className="stat-card">

            <h1>{inProgressTasks}</h1>

            <p>In Progress</p>

          </div>

          <div className="stat-card">

            <h1>{completedTasks}</h1>

            <p>Completed</p>

          </div>

          <div className="stat-card">

            <h1>{holdTasks}</h1>

            <p>On Hold</p>

          </div>

        </div>

        {/* SEARCH + FILTER */}

        <div className="search-filter">

          <div className="search-box">

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="filter-buttons">

            <button
              onClick={() => setFilter("All")}
            >
              All
            </button>

            <button
              onClick={() =>
                setFilter("In Progress")
              }
            >
              In Progress
            </button>

            <button
              onClick={() =>
                setFilter("Completed")
              }
            >
              Completed
            </button>

            <button
              onClick={() =>
                setFilter("Hold")
              }
            >
              Hold
            </button>

          </div>

        </div>

        {/* LOADER */}

        {loading && <Loader />}

        {/* TASK GRID */}

        <div className="task-grid">

          {filteredTasks

            .slice(0, displayLimit)

            .map((task) => (

              <TaskCard

                key={task.id}

                taskData={task}

                deleteTask={deleteTask}

                updateStatus={updateStatus}

                editTask={editTask}

              />

            ))}

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default Home;