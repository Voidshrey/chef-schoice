import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/userHelper.js";
import { UserContext } from "../context/UserContext.jsx";
import { useSnackbar } from "react-simple-snackbar";
import { successOptions, errorOptions } from "../utils/common.js";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);
  const [successOpen, successClose] = useSnackbar(successOptions);
  const [errorOpen, errorClose] = useSnackbar(errorOptions);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const body = {
      email,
      password,
    };
    try {
      let response = await loginUser(body);
      if (response.message === "User logged in successfully") {
        successOpen("User logged in successfully", 3000);
        setUserId(response?.user?._id);
        navigate("/home");
      } else {
        errorOpen("User failed incorrect email or password!!", 3000);
      }
    } catch (error) {
      errorOpen("User failed incorrect email or password!!", 3000);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
