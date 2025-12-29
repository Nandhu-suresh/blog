import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setErr] = useState(null);

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", inputs);
            login(res.data);
            navigate(res.data.role === 'admin' ? "/admin" : "/");
        } catch (err) {
            setErr(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1 className="page-title" style={{ textAlign: 'center' }}>Login</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <input
                        required
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        className="input"
                    />
                    <button type="submit" className="btn">Login</button>
                    {err && <p style={{ color: 'red', textAlign: 'center' }}>{err}</p>}
                    <span style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)' }}>Register</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;
