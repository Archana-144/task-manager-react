import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";

import "../App.css";

function Login() {

  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");

  function handleLogin(e) {

    e.preventDefault();

    // EMPTY VALIDATION

    if (
      name === "" ||
      email === "" ||
      password === ""
    ) {

      setMessage("All fields are required");

      return;
    }

    // NAME VALIDATION

    if (name.length < 3) {

      setMessage(
        "Name must contain at least 3 characters"
      );

      return;
    }

    // EMAIL VALIDATION

    if (!email.includes("@")) {

      setMessage("Enter valid email");

      return;
    }

    // PASSWORD VALIDATION

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {

      setMessage(
        "Password must contain 6+ chars, 1 uppercase and 1 number"
      );

      return;
    }

    // SUCCESS

    setUser({
      name,
      email,
    });

    navigate("/home");
  }

  return (

    <div className="login-page">

      <div className="login-card">

        {/* LOGO */}

        <div className="login-logo">

          <svg

            width="110"

            height="50"

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

        {/* TITLE */}

        <h1>TaskFlow</h1>

        <p>
          Sign in to manage your tasks
        </p>

        {/* FORM */}

        <form onSubmit={handleLogin}>

          {/* NAME */}

          <label>
            FULL NAME
          </label>

          <input
  type="text"
  placeholder="e.g.Archana BY"
  value={name}
  onKeyDown={(e) => {

    if (e.key === " ") {

      e.preventDefault();

    }

  }}
  onChange={(e) =>

    setName(

      e.target.value.replace(/\s/g, "")

    )

  }
/>
          {/* EMAIL */}

          <label>
            EMAIL ADDRESS
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          {/* PASSWORD */}

          <label>
            PASSWORD
          </label>

          <div className="password-box">
<input
  type={
    showPassword
      ? "text"
      : "password"
  }

  placeholder="Enter password"

  value={password}

  onKeyDown={(e) => {

    if (e.key === " ") {

      e.preventDefault();

    }

  }}

  onChange={(e) =>

    setPassword(

      e.target.value.replace(/\s/g, "")

    )

  }
/>

            <span
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >

              👁

            </span>

          </div>

          {/* BUTTON */}

          <button
            className="login-btn"
            type="submit"
          >

            Sign In →

          </button>

          {/* MESSAGE */}

          <p className="error-message">

            {message}

          </p>
          <p className="password-note">

  Password must be 6+ characters
  with an uppercase letter
  and a number.

</p>

        </form>

      </div>

    </div>

  );

}

export default Login;