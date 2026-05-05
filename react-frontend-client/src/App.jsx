import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SearchComponent from './components/SearchComponent';
import ArchiveComponent from './components/ArchiveComponent';
import GameDetailsComponent from './components/GameDetailsComponent';
import LoginPage from './components/auth/LoginComponent';
import { Link } from 'react-router-dom';
import ProtectedLayout from './components/auth/ProtectedLayout.jsx';
import ProfilePage from './components/auth/ProfilePage.jsx';

function App() {

  return (
    <Router>
      <div className="container">
        <nav className="nav">
          <Link to="/search" className="nav-logo">&#9632; RetroArchive</Link>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/search">Search</Link>
          <Link to="/archive">My List</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Navigate to="/search" />} />
            <Route path="/search" element={<SearchComponent />} />
            <Route path="/archive" element={<ArchiveComponent />} />
            <Route path="/games/:id" element={<GameDetailsComponent />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
