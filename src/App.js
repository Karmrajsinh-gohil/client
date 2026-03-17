import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import HomeRedirectRoute from "./routes/HomeRedirectRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import MyComplaints from "./pages/MyComplaints";
import Home from "./visitor/Home";
import CitizenLogin from "./citizen/Login";
import CitizenRegister from "./citizen/Register";
import CitizenDashboard from "./citizen/CitizenDashboard";
import ComplaintRegister from "./citizen/ComplaintRegister";

function App() {
  return (
<div>
    
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<HomeRedirectRoute />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/citizen-login" element={<CitizenLogin />} />
        <Route path="/citizen-register" element={<CitizenRegister />} />
        <Route
          path="/citizen-dashboard"
          element={
            <PrivateRoute>
              <CitizenDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-complaint"
          element={
            <PrivateRoute>
              <ComplaintRegister />
            </PrivateRoute>
          }
        />
        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
  path="/admin"
  element={
    <PrivateRoute>
      <AdminDashboard />
    </PrivateRoute>
  }
/>
<Route
  path="/my-complaints"
  element={
    <PrivateRoute>
      <MyComplaints />
    </PrivateRoute>
  }
/>
{/* Add other protected routes here */}
      </Routes>
    </Router>
    </div>
  );
}


export default App;
