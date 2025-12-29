import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const BlogView = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                setBlog(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchBlog();
    }, [id]);

    if (!blog) return <div className="container" style={{ marginTop: '2rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '800px' }}>
            <Link to="/" style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>&larr; Back to Home</Link>

            <article>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: '1.2' }}>{blog.title}</h1>
                <div style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span> • <span>{blog.author}</span>
                </div>
                {blog.image && <img src={blog.image} alt="" className="post-header" />}
                <div style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                    {blog.content.split('\n').map((p, i) => (
                        <p key={i} style={{ marginBottom: '1rem' }}>{p}</p>
                    ))}
                </div>
            </article>
        </div>
    );
};

export default BlogView;
