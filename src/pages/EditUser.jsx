import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    mail: "",
    course: ""
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);

  const updateUser = () => {
    fetch(`http://localhost:8080/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(() => navigate("/"));
  };

  return (
    <div className="p-6">
      <h2>Edit User</h2>

      <input value={user.name}
        onChange={(e) => setUser({...user, name: e.target.value})} />

      <input value={user.mail}
        onChange={(e) => setUser({...user, mail: e.target.value})} />

      <input value={user.course}
        onChange={(e) => setUser({...user, course: e.target.value})} />

      <button onClick={updateUser}>Update</button>
    </div>
  );
}

export default EditUser;