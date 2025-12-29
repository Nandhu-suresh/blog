import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/blogs");
                setBlogs(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 className="page-title">Latest Articles</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Discover stories, thinking, and expertise.</p>
            </header>

            <div className="grid">
                {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
            {blogs.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No blogs found.</p>}
        </div>
    );
};

export default Home;
