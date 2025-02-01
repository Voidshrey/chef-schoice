# Chef's Choice

Chef's Choice is a web application that allows users to explore random meals, save their favorite meals, and view their favorite meals list. The application consists of a frontend built with React and a backend built with Node.js and Express, connected to a MongoDB database.

## Features

- Fetch a random meal from an external API
- Save meals to a user's favorites list
- View a list of favorite meals

## Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/chefs-choice.git
cd chefs-choice

2. Install backend dependencies:

cd backend
npm install

3. Install frontend dependencies

cd ../frontend
npm install

Running the Application

Start the backend server:
The backend server will run on http://localhost:3000.

Start the frontend development server:

The frontend development server will run on 
http://localhost:5173.


Project Structure

Backend
server.js: Entry point for the backend server

db.js: MongoDB connection configuration

User.js: User model
Meal.js: Meal model

mealsController.js: Controller for meal-related operations
userController.js: Controller for user-related operations

backend/routes/mealsRoutes.js: Routes for meal-related endpoints
userRoutes.js: Routes for user-related endpoints
errorHandler.js: Global error handling middleware

Frontend
frontend/src/App.js: Main application component
frontend/src/components/Home.jsx: Home page component
frontend/src/components/Favorites.jsx: Favorites page component
frontend/src/context/UserContext.jsx: User context for managing 

user state
frontend/src/service/mealHelper.js: Helper functions for 

meal-related API calls
frontend/src/components/Favorites.css: CSS for the Favorites 

component
frontend/src/components/Home.css: CSS for the Home component

API Endpoints

User Endpoints
POST /api/users/register: Register a new user

Meal Endpoints
GET /api/randommeal: Fetch a random meal
POST /api/meals/favorite: Add a meal to the user's favorites
GET /api/meals/favorites/:userId: Get the user's favorite meals

Usage
Register a new user using the registration form on the frontend.
Fetch a random meal and add it to the user's favorites.
View the list of favorite meals on the Favorites page.
L




