import React, { useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../service/userHelper';
import Snackbar from './Snackbar';
import { UserContext } from '../context/UserContext.jsx';


function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [foodPreference, setFoodPreference] = useState('vegetarian');
  const [snackbar, setSnackbar] = useState({ message: '', type: '', visible: false });
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);

  const handleSubmit = async (e) => {
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
        setSnackbar({ message: 'User registered successfully!', type: 'success', visible: true });
        navigate('/home', { state: { userId: response.user._id } });
      } else {
        setSnackbar({ message: 'Registration failed!', type: 'error', visible: true });
      }
    } catch (error) {
      setSnackbar({ message: 'Error registering user!', type: 'error', visible: true });
      console.error('Error registering user:', error);
    }
  };



  return (
    <div className="login-container">
      <h2>Register to save preferences</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder='Username' />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email"/>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required   placeholder="Password"/>
        </div>
        <div className="form-group">
          <label>Food Preferences:</label>
          <select value={foodPreference} onChange={(e) => setFoodPreference(e.target.value)} required placeholder="Food Preferences">
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="breakfast">Breakfast</option>
            <option value="chicken">Chicken</option>
            <option value="dessert">Dessert</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
            <option value="pasta">Pasta</option>
            <option value="none">None</option>
            <option value="seafood">Seafood</option>
            <option value="starter">Starter</option>
          </select>
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
      <p>Already registered? <button onClick={() => navigate('/login')} className="login-button">Login</button></p>
      {snackbar.visible && <Snackbar message={snackbar.message} type={snackbar.type} />}

    </div>
  );
}

export default Register;