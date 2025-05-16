import './navbar.scss';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");

  const handleLogout = () => {
    logout();
    navigate("/login");  // redirect after logout
  };

  const handleSearch = () => {
    alert("Search bar coming soon 🚀");
  };

  const handleAppNavigate = () => navigate("/");

  const handleFullScreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleNotificationsToggle = () => {
    setShowNotifications(!showNotifications);
  };

  const handleSettings = () => {
    navigate("/profile");
  };

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/react.svg" alt="logo" />
        <span>React Admin</span>
      </div>

      <div className="icons">
        <img src="/search.svg" alt="Search" className="icon" onClick={handleSearch} />
        <img src="/app.svg" alt="App" className="icon" onClick={handleAppNavigate} />
        <img src="/expand.svg" alt="Full Screen" className="icon" onClick={handleFullScreenToggle} />

        <div className="notification" onClick={handleNotificationsToggle}>
          <img src="/notifications.svg" alt="Notifications" />
          <span>1</span>
          {showNotifications && (
            <div className="notifications-dropdown">
              <p>No new notifications 🎉</p>
            </div>
          )}
        </div>

        <div className="user">
          <span>{user ? user.email : "Guest"}</span>
        </div>

        {user ? (
          <button className="nav-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <button className="nav-btn" onClick={handleLogin}>
              Login
            </button>
            <button className="nav-btn" onClick={handleSignup}>
              Signup
            </button>
          </>
        )}

        <img src="/settings.svg" alt="Settings" className="icon" onClick={handleSettings} />
      </div>
    </div>
  );
};

export default Navbar;
