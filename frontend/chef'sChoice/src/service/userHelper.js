import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (loginBody) =>{
try {
  const response = await axios.post(`${API_URL}/user/login`, loginBody);
  return response.data;
} catch (error) {
  console.error("Error loggingin User");
  throw error;
}
};

