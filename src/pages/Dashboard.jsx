import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../services/services";
import { toast } from "react-toastify";
import Card from "../component/Card";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [form, setForm] = useState({
    name: "",
    mail: "",
    course: ""
  });

  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  // FETCH
  const fetchData = async () => {
    try {
      const res = await getUsers();
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, []);


  // ADD / UPDATE
  const handleSubmit = async () => {
    if (editId) {
      await updateUser(editId, form);
      toast.success("User Updated ✅");
    } else {
      await createUser(form);
      toast.success("User Added 🎉");
    }

    setShowModal(false);
    setForm({ name: "", mail: "", course: "" });
    setEditId(null);
    fetchData();
  };

  // DELETE
  const handleDelete = async (id) => {
    await deleteUser(id);
    toast.success("User Deleted Successfully");
    fetchData();
  };

  // EDIT
  const handleEdit = (user) => {
    setForm(user);
    setEditId(user.id);
    setShowModal(true);
  };

  // SEARCH
  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // PAGINATION
  const start = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  return (
    <div className="p-6 animate-[float_6s_ease-in-out_infinite]">

      <h1 className="text-3xl font-bold mb-4 text-white">Dashboard</h1>

      {/* Student dashboard */}
      <Card students={students} selectedCourse={selectedCourse} />


      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6  ">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

          {/* 🔍 Search Bar */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Icon */}
            <span className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </span>
          </div>

          <div className="flex gap-2">
            {/* ➕ Add User Button */}
            <button
              onClick={() => {
                setForm({ name: "", mail: "", course: "" });
                setEditId(null);
                setShowModal(true);
              }}
              className="flex items-center gap-2 px-5 py-2 rounded-xl 
    bg-blue-500
    text-white shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
            >
              ➕ Add User
            </button>
            {/* Logout Button */}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="flex items-center gap-2 px-5 py-2 rounded-xl 
    bg-red-500
    text-white shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
            >
              🚪 Logout
            </button>
          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">

            {/* Head */}
            <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {paginated.map((s, index) => (
                <tr
                  key={s.id}
                  className="transition duration-300 bg-white/5 border-b border-white/10 hover:bg-white/10 hover:scale-[1.01]"
                >
                  <td className="p-4 font-medium text-gray-300">
                    {s.id}
                  </td>

                  <td className="p-4 font-semibold text-white">
                    {s.name}
                  </td>

                  <td className="p-4 text-gray-400">
                    {s.mail}
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 text-sm rounded-full bg-green-500/20 text-green-400 border border-green-400/20">
                      {s.course}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => handleEdit(s)}
                      className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition shadow-sm"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => setDeleteId(s.id)}
                      className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition shadow-sm"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="mt-6 block flex justify-center items-center gap-2">

        {/* Previous */}
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-3 py-1 rounded-lg 
    ${page === 1 ? "bg-gray-700 opacity-50" : "bg-white/10 hover:bg-white/20"} 
    text-white transition`}
        >
          ⬅ Prev
        </button>

        {/* Page Numbers */}
        {[...Array(Math.ceil(filtered.length / itemsPerPage))].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-lg transition 
      ${page === i + 1
                ? "bg-blue-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={page === Math.ceil(filtered.length / itemsPerPage)}
          onClick={() => setPage(page + 1)}
          className={`px-3 py-1 rounded-lg 
    ${page === Math.ceil(filtered.length / itemsPerPage)
              ? "bg-gray-700 opacity-50"
              : "bg-white/10 hover:bg-white/20"} 
    text-white transition`}
        >
          Next ➡
        </button>

      </div>




      {deleteId && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-96 text-white shadow-2xl">

            <h2 className="text-xl font-semibold mb-3">Delete User?</h2>
            <p className="text-gray-300 mb-4">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleDelete(deleteId);
                  setDeleteId(null);
                }}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-white"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}


      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-96 text-white shadow-2xl">

            <h2 className="text-xl font-semibold mb-4">
              {editId ? "✏️ Edit User" : "➕ Add User"}
            </h2>

            <input
              value={form.name}
              placeholder="Name"
              className="w-full p-2 mb-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              value={form.mail}
              placeholder="Email"
              className="w-full p-2 mb-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setForm({ ...form, mail: e.target.value })}
            />

            <input
              value={form.course}
              placeholder="Course"
              className="w-full p-2 mb-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setForm({ ...form, course: e.target.value })}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white hover:scale-105 transition"
              >
                {editId ? "Update" : "Save"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;