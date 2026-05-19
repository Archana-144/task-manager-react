import { Link, useLocation, useNavigate } from "react-router-dom";

import "../App.css";

function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  // LOGOUT

  function handleLogout() {

    navigate("/");

  }

  return (

    <nav className="navbar">

      {/* LOGO */}

      <div className="logo">

        TaskFlow

      </div>

      {/* NAV LINKS */}

      <div className="nav-links">

        <Link
          to="/home"
          className={
            location.pathname === "/home"
              ? "active-link"
              : ""
          }
        >

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

          Add Task

        </Link>

        {/* LOGOUT */}

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