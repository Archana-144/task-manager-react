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

        TaskFlow

      </div>

      {/* NAV LINKS - CENTER */}

      <div className="nav-links-center">

        <Link
          to="/home"
          className={
            location.pathname === "/home"
              ? "active-link"
              : ""
          }
        >

          <span className="nav-icon">🏠</span> Home

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

      </div>

      {/* USER NAME AND LOGOUT */}

      <div className="nav-right">
        {user && (
          <span className="user-name">{user.name}</span>
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