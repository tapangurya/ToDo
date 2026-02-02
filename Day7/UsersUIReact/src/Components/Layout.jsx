import { Outlet, Link } from 'react-router-dom';
import { Home, UserPlus, Users } from 'lucide-react'; // Import icons
import '../../CSS/Home.css';

const Layout = () => {
  return (
    <>
      <header className="header">
        <div className="logo-container">
          <h1>My App</h1>
        </div>
        <nav>
          <Link to="/" className="nav-link">
            <Home size={18} className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link to="/userform" className="nav-link">
            <UserPlus size={18} className="nav-icon" />
            <span>User Form</span>
          </Link>
          <Link to="/userslist" className="nav-link">
            <Users size={18} className="nav-icon" />
            <span>User List</span>
          </Link>
        </nav>
      </header>

      <main style={{ minHeight: '80vh', padding: '20px' }}>
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; 2026 My App</p>
      </footer>
    </>
  );
};

export default Layout;
