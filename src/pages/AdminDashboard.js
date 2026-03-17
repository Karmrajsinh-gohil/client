import { useEffect, useState } from "react";
import axios from "../api/axios";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("/complaints", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setComplaints(res.data);
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `/complaints/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchComplaints();
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {complaints.map((c) => (
        <div key={c._id}>
          <h4>{c.title}</h4>
          <p>{c.description}</p>
          <p>User: {c.user?.name}</p>
          <p>Status: {c.status}</p>

          <button onClick={() => updateStatus(c._id, "In Progress")}>
            In Progress
          </button>

          <button onClick={() => updateStatus(c._id, "Resolved")}>
            Resolved
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
