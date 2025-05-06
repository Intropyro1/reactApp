import React from "react";

interface LogInComponentProps {
  isLoggedIn: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

export const LogInComponent: React.FC<LogInComponentProps> = ({
  isLoggedIn,
  handleLogin,
  handleLogout,
}) => {
  return (
    <div className="loginSection">
      {!isLoggedIn ? (
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleLogin}
        >
          Login to Spotify
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default LogInComponent;
