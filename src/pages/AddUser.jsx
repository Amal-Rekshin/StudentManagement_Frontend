import { useState, useEffect } from "react";
import { createUser } from "../services/services";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [user, setUser] = useState({
    name: "",
    mail: "",
    course: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async () => {
    try {
      await createUser(user);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
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