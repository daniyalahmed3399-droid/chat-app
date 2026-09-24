import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ChatContext } from "../context/ChatContext";

function Login() {
  const { login } = useContext(ChatContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    // Try to log the user in.
    const loginSuccessful = login(username, password);

    if (!loginSuccessful) {
      setError("Please enter both username and password.");
      return;
    }

    // Login was successful.
    setError("");

    // Take the user to Dashboard.
    navigate("/dashboard");
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Login</h1>

        <p>
          Login to your Chat App account.
        </p>

        <form onSubmit={handleLogin}>

          {/* Username */}
          <div className="login-field">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
            />
          </div>

          {/* Password */}
          <div className="login-field">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button type="submit">
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;