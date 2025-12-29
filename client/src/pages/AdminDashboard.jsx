import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('blogs');
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);

    // Blog Form State
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: ''
    });

    const fetchBlogs = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/blogs");
            setBlogs(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/users");
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (activeTab === 'blogs') fetchBlogs();
        if (activeTab === 'users') fetchUsers();
    }, [activeTab]);

    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/blogs", formData);
            setFormData({ title: '', content: '', image: '' });
            fetchBlogs();
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteBlog = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/blogs/${id}`);
            fetchBlogs();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div style={{ flex: 1, padding: '2rem' }}>
                <h1 className="page-title">{activeTab === 'blogs' ? 'Manage Blogs' : 'Users List'}</h1>

                {activeTab === 'blogs' && (
                    <div>
                        <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Create New Blog</h3>
                            <form onSubmit={handleBlogSubmit} style={{ display: 'grid', gap: '1rem' }}>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="input"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Image URL (optional)"
                                    className="input"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                />
                                <textarea
                                    placeholder="Content"
                                    className="input"
                                    rows="5"
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    required
                                />
                                <button type="submit" className="btn" style={{ wudth: 'fit-content' }}>Publish Blog</button>
                            </form>
                        </div>

                        <div className="grid">
                            {blogs.map(blog => (
                                <div key={blog._id} className="card" style={{ padding: '1rem', position: 'relative' }}>
                                    <h3 style={{ marginBottom: '0.5rem' }}>{blog.title}</h3>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </p>
                                    <button
                                        onClick={() => handleDeleteBlog(blog._id)}
                                        className="btn"
                                        style={{ background: '#ef4444', fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="card" style={{ overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                                <tr>
                                    <th style={{ padding: '1rem' }}>ID</th>
                                    <th style={{ padding: '1rem' }}>Username</th>
                                    <th style={{ padding: '1rem' }}>Role</th>
                                    <th style={{ padding: '1rem' }}>Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '1rem' }}>{user._id}</td>
                                        <td style={{ padding: '1rem' }}>{user.username}</td>
                                        <td style={{ padding: '1rem' }}>User</td>
                                        <td style={{ padding: '1rem' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
