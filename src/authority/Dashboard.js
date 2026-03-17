import React, {useEffect, useState} from "react";
import axios from "axios";

function AuthorityDashboard(){

const [complaints,setComplaints] = useState([]);

useEffect(()=>{

axios.get("http://localhost:5000/api/complaints/all")
.then(res=>setComplaints(res.data))

},[])

return(

<div className="container mt-5">

<h2>Authority Complaint Panel</h2>

<table className="table table-bordered mt-4">

<thead>

<tr>
<th>Title</th>
<th>Description</th>
<th>Status</th>
</tr>

</thead>

<tbody>

{complaints.map(c=>(
<tr key={c._id}>

<td>{c.title}</td>
<td>{c.description}</td>
<td>{c.status}</td>

</tr>
))}

</tbody>

</table>

</div>

)

}

export default AuthorityDashboard;