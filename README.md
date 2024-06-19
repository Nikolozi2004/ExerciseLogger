# ExerciseLogger

ExerciseLogger is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to log and manage their exercises. It provides a user-friendly interface for creating, editing, and deleting exercise entries, as well as user authentication and profile management features.

## Features

- User registration and login
- Exercise logging with title, reps, and load
- Exercise editing and deletion
- Light and dark mode toggle
- User profile editing (email, username, and password)
- Profanity filter for usernames

## Technologies Used

### Frontend

- React
- React Router
- Axios
- TailwindCSS
- Heroicons
- Vite

### Backend

- Node.js
- Express
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- bcrypt
- bad-words (profanity filter)
- validator

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/ExerciseLogger.git
```
2. Install dependencies for the server:

```bash
cd ExerciseLogger/server
npm install
```
3. Install dependencies for the client:

```bash
cd ExerciseLogger/server
npm install
```
4. Create a .env file in the server directory and add your MongoDB connection string:

```bash
MONGO_URI=your_mongodb_connection_string
```
5. Start the server:

```bash
cd ExerciseLogger/server
npm run dev
```
6. Start the client in a separate terminal window:

```bash
cd ExerciseLogger/client
npm run dev
```
7. Open your browser and navigate to http://localhost:5173 to access the application.

## Usage

- Register a new account or log in with an existing one.
- Add exercises by filling out the exercise form with a title, reps, and load.
- View, edit, or delete your exercises from the exercise list.
- Toggle between light and dark mode.
- Edit your profile information, including email, username, and password.


## License

This project is licensed under the [MIT License](LICENSE).
