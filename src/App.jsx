import { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Chats from "./pages/Chats";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

import { ChatContext } from "./context/ChatContext";

function App() {
  const { currentUser } = useContext(ChatContext);

  return (
    <BrowserRouter>

      {/* Only show the Navbar when logged in */}
      {currentUser && <NavBar />}

      <Routes>

        {/* Login page */}
        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/login"
          element={
            currentUser ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login />
            )
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            currentUser ? (
              <Dashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Chats */}
        <Route
          path="/chats"
          element={
            currentUser ? (
              <Chats />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            currentUser ? (
              <Profile />
            ) : (
              <Navigate to="/" />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App