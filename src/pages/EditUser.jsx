import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../services/services";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    mail: "",
    course: ""
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      try {
        const res = await getUserById(id);
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, navigate]);

  const updateUserDetails = async () => {
    try {
      await updateUser(id, user);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
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

      <button onClick={updateUserDetails}>Update</button>
    </div>
  );
}

export default EditUser;