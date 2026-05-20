import { Link, useLocation, useNavigate } from "react-router-dom";

import { useContext } from "react";

import { UserContext } from "../context/UserContext";

import "../App.css";

function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  const { user } = useContext(UserContext);

  // LOGOUT

  function handleLogout() {

    navigate("/");

  }

  return (

    <nav className="navbar">

      {/* LOGO */}

      <div className="logo">

        <div className="login-logo">

          <svg

            width="40"

            height="40"

            viewBox="0 0 100 110"

            xmlns="http://www.w3.org/2000/svg"

          >

            <defs>

              <linearGradient

                id="purpleGrad"

                x1="0%"

                y1="0%"

                x2="100%"

                y2="100%"

              >

                <stop offset="0%" stopColor="#8b7cff" />

                <stop offset="50%" stopColor="#7c6cff" />

                <stop offset="100%" stopColor="#5a4fd4" />

              </linearGradient>

            </defs>

            <polygon

              points="50,15 85,38 85,85 50,108 15,85 15,38"

              fill="none"

              stroke="url(#purpleGrad)"

              strokeWidth="5"

              strokeLinejoin="round"

            />

          </svg>

        </div>

        <h2>TaskFlow</h2>

      </div>

      {/* NAV LINKS */}

      <div className="nav-links-center">

        <Link
          to="/home"
          className={
            location.pathname === "/home"
              ? "active-link"
              : ""
          }
        >

          <span className="nav-icon">

            🏠

          </span>

          Home

        </Link>

        <Link
          to="/add-task"
          className={
            location.pathname === "/add-task"
              ? "active-link"
              : ""
          }
        >

          + Add Task

        </Link>

      </div>

      {/* RIGHT SIDE */}

      <div className="nav-right">

        {user && (

          <span className="user-name">

            {user.name}

          </span>

        )}

        <button

          className="logout-btn"

          onClick={handleLogout}

        >

          Logout

        </button>

      </div>

    </nav>

  );

}

export default Navbar;