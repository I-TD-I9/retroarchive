import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <Link to="/search" className="nav-logo">&#9632; RetroArchive</Link>
      <Link to="/search">Search</Link>
      <Link to="/archive">My List</Link>
    </nav>
  );
};

export default Nav;
