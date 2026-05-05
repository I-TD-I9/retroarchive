import React from 'react';
import { useAuth } from './AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div>
      <h2>Profile Page</h2>

      <h3>Welcome, {user.displayname}!</h3>

      <div>
        <p><strong>Email:</strong> {user.email}</p>

        {user.googleId && (
          <p><strong>User ID:</strong> {user.googleId}</p>
        )}
      </div>

      <hr />

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
