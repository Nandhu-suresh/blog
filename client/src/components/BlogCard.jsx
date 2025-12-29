import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
    return (
        <div className="card">
            <div style={{ padding: '1.5rem' }}>
                <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{blog.title}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {blog.content}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    <Link to={`/blog/${blog._id}`} className="btn btn-secondary">
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
