import { useState } from "react";
import axios from "../api/axios";

function CreateComplaint() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {

      await axios.post(
        "/complaints",
        {
          title,
          description,
          category,
          department,
          location
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Complaint submitted successfully");

      setTitle("");
      setDescription("");
      setCategory("");
      setDepartment("");
      setLocation("");

    } catch (err) {

      console.error(err);
      alert("Error submitting complaint");

    }
  };

  return (
    <div style={{textAlign:"center", marginTop:"40px"}}>

      <h2>Create Complaint</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Complaint Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
        />

        <br/><br/>

        <textarea
          placeholder="Complaint Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          required
        />

        <br/><br/>

        <input
          type="text"
          placeholder="Category (Water / Road / Electricity)"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          required
        />

        <br/><br/>

        <input
          type="text"
          placeholder="Department (Municipality / Police)"
          value={department}
          onChange={(e)=>setDepartment(e.target.value)}
          required
        />

        <br/><br/>

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          required
        />

        <br/><br/>

        <button type="submit">Submit Complaint</button>

      </form>

    </div>
  );
}

export default CreateComplaint;