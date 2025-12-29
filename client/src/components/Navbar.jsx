import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="nav-brand">
                    Blog<span style={{ color: 'var(--secondary)' }}>Platform</span>
                </Link>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span>Welcome, {currentUser?.username}</span>
                    {currentUser?.role === 'admin' && (
                        <Link to="/admin" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Dashboard</Link>
                    )}
                    <button onClick={handleLogout} className="btn" style={{ background: 'var(--secondary)' }}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
