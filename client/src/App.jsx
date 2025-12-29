import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContextProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import BlogView from "./pages/BlogView";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && currentUser.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

function AppRoutes() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser && <Navbar />}
      <Routes>
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to={currentUser.role === 'admin' ? "/admin" : "/"} />} />
        <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/" />} />

        {/* User Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/blog/:id" element={
          <ProtectedRoute>
            <BlogView />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
