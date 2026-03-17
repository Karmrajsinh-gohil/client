import { useState } from "react";
import axios from "../api/axios";

function CreateComplaint() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "/complaints",
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Complaint submitted successfully");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Error submitting complaint");
    }
  };

  return (
    <div>
      <h2>Create Complaint</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Complaint Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Complaint Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateComplaint;
