const Sidebar = ({ activeTab, setActiveTab }) => {
    return (
        <div style={{ width: '250px', backgroundColor: 'var(--surface)', borderRight: '1px solid var(--border)', minHeight: 'calc(100vh - 70px)', padding: '2rem 1rem' }}>
            <ul style={{ listStyle: 'none' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                    <button
                        onClick={() => setActiveTab('blogs')}
                        style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius)',
                            background: activeTab === 'blogs' ? 'var(--primary)' : 'transparent',
                            color: activeTab === 'blogs' ? 'white' : 'var(--text)',
                            border: 'none',
                            fontSize: '1rem'
                        }}
                    >
                        Manage Blogs
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActiveTab('users')}
                        style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius)',
                            background: activeTab === 'users' ? 'var(--primary)' : 'transparent',
                            color: activeTab === 'users' ? 'white' : 'var(--text)',
                            border: 'none',
                            fontSize: '1rem'
                        }}
                    >
                        View Users
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
