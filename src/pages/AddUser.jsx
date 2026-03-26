import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [user, setUser] = useState({
    name: "",
    mail: "",
    course: ""
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(() => navigate("/"));
  };

  return (
    <div className="p-6">
      <h2>Add User</h2>

      <input placeholder="Name"
        onChange={(e) => setUser({...user, name: e.target.value})} />

      <input placeholder="Email"
        onChange={(e) => setUser({...user, mail: e.target.value})} />

      <input placeholder="Course"
        onChange={(e) => setUser({...user, course: e.target.value})} />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddUser;