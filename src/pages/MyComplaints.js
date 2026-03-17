import { useEffect, useState } from "react";
import axios from "../api/axios";

function MyComplaints() {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {

    const fetchComplaints = async () => {

      const token = localStorage.getItem("token");

      const res = await axios.get("/complaints/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setComplaints(res.data);
    };

    fetchComplaints();

  }, []);

  return (
    <div>
      <h2>My Complaints</h2>

      {complaints.map((c) => (
        <div key={c._id}>
          <h4>{c.title}</h4>
          <p>{c.description}</p>
          <p>Status: {c.status}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default MyComplaints;