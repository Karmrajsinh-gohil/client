// Dashboard.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("No token found. Please login.");
          return;
        }

        const res = await axios.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setMessage("Failed to load user info");
      }
    };

    fetchUser();
  }, []);

  // -----------------------------
  // Logout Function
  // -----------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login"); // redirect to login page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Dashboard</h2>

      {user ? (
        <>
          <p>
            Welcome, {user.name} ({user.role})
          </p>
          <button
            onClick={handleLogout}
            style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
          >
            Logout
          </button>
        </>
      ) : (
        <p>{message || "Loading..."}</p>
      )}
    </div>
  );
}

export default Dashboard;
