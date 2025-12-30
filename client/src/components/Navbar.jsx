import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ChatBot from "./chatbot";

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isChatOpen, setIsChatOpen] = useState(false);

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

                    {/* Chatbot Toggle Button */}
                    <button
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        className="btn btn-secondary"
                        style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                        <span>🤖</span> Ask AI
                    </button>

                    <span>Welcome, {currentUser?.username}</span>
                    {currentUser?.role === 'admin' && (
                        <Link to="/admin" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Dashboard</Link>
                    )}
                    <button onClick={handleLogout} className="btn" style={{ background: 'var(--secondary)' }}>
                        Logout
                    </button>
                </div>
            </div>
            {/* Render Chatbot outside the nav flow but controlled by it */}
            <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </nav>
    );
};

export default Navbar;
