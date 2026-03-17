import { useState } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      await axios.post("/auth/register",{
        name,
        email,
        password
      });

      alert("Registration Successful. Please Login.");

      navigate("/login");

    } catch(err){

      console.error(err);
      alert("Registration Failed");

    }
  }

  return (
    <div style={{textAlign:"center",marginTop:"50px"}}>

      <h2>Citizen Registration</h2>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Full Name"
          required
          onChange={(e)=>setName(e.target.value)}
        />
        <br/><br/>

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e)=>setEmail(e.target.value)}
        />
        <br/><br/>

        <input
          type="password"
          placeholder="Password"
          required
          autoComplete="new-password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <br/><br/>

        <button type="submit">Register</button>

      </form>

      <br/>

      <p>
        Already Registered? <Link to="/login">Login Here</Link>
      </p>

    </div>
  );
}

export default Register;