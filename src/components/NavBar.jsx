import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <h2>Chat App</h2>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/chats">Chats</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}

export default NavBar;