import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../service/userHelper";
import { UserContext } from "../context/UserContext.jsx";
import { useSnackbar } from "react-simple-snackbar";
import { successOptions, errorOptions } from "../utils/common.js";
import { GiToken } from "react-icons/gi";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);
  const [successOpen, successClose] = useSnackbar(successOptions);
  const [errorOpen, errorClose] = useSnackbar(errorOptions);

  const handleSubmit = async (e) => {
    localStorage.clear();
    let formData = {
      username,
      email,
      password,
      dietaryPreferences: foodPreference,
    };
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      if (response.message === "User registered successfully") {
        setUserId(response.user._id);
        localStorage.setItem("token", response.token);
        successOpen("User registered successfully!", 3000);
        navigate("/home", { state: { userId: response.user._id } });
      } else {
        errorOpen("Registration failed!", 3000);
      }
    } catch (error) {
      errorOpen("Error registering user!");
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Register to save preferences</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <p>
        Already registered?{" "}
        <button onClick={() => navigate("/login")} className="login-button">
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;
