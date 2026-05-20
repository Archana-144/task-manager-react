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

import { fetchTasks } from "../services/taskService";

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

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 9;

  const navigate = useNavigate();

  // REDIRECT IF NOT LOGGED IN

  useEffect(() => {

    if (!user) {

      navigate("/");

    }

  }, [user, navigate]);

  // LOAD TASKS

  useEffect(() => {

    async function loadTasks() {

      try {

        // PREVENT DUPLICATES

        if (tasks.length > 0) {

          setLoading(false);

          return;

        }

        // FETCH API TASKS

        const apiTasks = await fetchTasks();

        // GET LOCAL TASKS

        const localTasks = JSON.parse(

          localStorage.getItem("tasks")

        ) || [];

        // REMOVE DUPLICATES

        const uniqueLocalTasks = localTasks.filter(

          (localTask) =>

            !apiTasks.some(

              (apiTask) =>

                apiTask.id === localTask.id

            )

        );

        // FINAL TASKS

        setTasks([

          ...apiTasks,

          ...uniqueLocalTasks,

        ]);

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    }

    loadTasks();

  }, []);

  // RESET PAGE ON SEARCH/FILTER CHANGE

  useEffect(() => {

    setCurrentPage(1);

  }, [search, filter]);

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

  // PAGINATION

  const totalPages = Math.ceil(

    filteredTasks.length / tasksPerPage

  );

  const startIndex =

    (currentPage - 1) * tasksPerPage;

  const endIndex =

    startIndex + tasksPerPage;

  const paginatedTasks = filteredTasks.slice(

    startIndex,

    endIndex

  );

  return (

    <div>

      <Navbar />

      <div className="home">

        {/* WELCOME */}

        <div className="welcome-card">

          <h1>

            Welcome{" "}

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

            <span className="search-icon">

              🔍

            </span>

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

              className={

                filter === "All"

                  ? "active-filter"

                  : ""

              }

              onClick={() => setFilter("All")}

            >

              All

            </button>

            <button

              className={

                filter === "In Progress"

                  ? "active-filter"

                  : ""

              }

              onClick={() =>

                setFilter("In Progress")

              }

            >

              In Progress

            </button>

            <button

              className={

                filter === "Completed"

                  ? "active-filter"

                  : ""

              }

              onClick={() =>

                setFilter("Completed")

              }

            >

              Completed

            </button>

            <button

              className={

                filter === "Hold"

                  ? "active-filter"

                  : ""

              }

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

        {/* TASK COUNT */}

        {!loading && filteredTasks.length > 0 && (

          <p className="tasks-info">

            Showing {

              paginatedTasks.length

            } of {

              filteredTasks.length

            } tasks

          </p>

        )}

        {/* TASK GRID */}

        <div className="task-grid">

          {paginatedTasks.map((task) => (

            <TaskCard

              key={task.id}

              taskData={task}

              deleteTask={deleteTask}

              updateStatus={updateStatus}

              editTask={editTask}

            />

          ))}

        </div>

        {/* PAGINATION */}

        {!loading && totalPages > 1 && (

          <div className="pagination">

            <button

              onClick={() => setCurrentPage(1)}

              disabled={currentPage === 1}

              className="pagination-btn"

            >

              «

            </button>

            <button

              onClick={() =>

                setCurrentPage((prev) =>

                  Math.max(prev - 1, 1)

                )

              }

              disabled={currentPage === 1}

              className="pagination-btn"

            >

              ‹

            </button>

            {Array.from(

              {

                length: Math.min(5, totalPages),

              },

              (_, i) => {

                const offset = Math.max(

                  0,

                  Math.min(

                    currentPage - 3,

                    totalPages - 5

                  )

                );

                return offset + i + 1;

              }

            ).map((page) => (

              <button

                key={page}

                onClick={() =>

                  setCurrentPage(page)

                }

                className={

                  currentPage === page

                    ? "pagination-btn active"

                    : "pagination-btn"

                }

              >

                {page}

              </button>

            ))}

            <button

              onClick={() =>

                setCurrentPage((prev) =>

                  Math.min(

                    prev + 1,

                    totalPages

                  )

                )

              }

              disabled={

                currentPage === totalPages

              }

              className="pagination-btn"

            >

              ›

            </button>

            <button

              onClick={() =>

                setCurrentPage(totalPages)

              }

              disabled={

                currentPage === totalPages

              }

              className="pagination-btn"

            >

              »

            </button>

          </div>

        )}

      </div>

      <Footer />

    </div>

  );

}

export default Home;