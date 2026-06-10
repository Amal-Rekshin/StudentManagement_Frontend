import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/services";
import { toast } from "react-toastify";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();


    const credentials = [
      {
        name : "Rekshin",
        username : "Rekshin",
        password : "rekshin"
      },
      {
        name : "Empty",
        username : "",
        password : ""
      }
    ]


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data);
      toast.success("Login Successful 🎉");
      navigate("/");
    } catch (err) {
      const msg = err.response?.data || "Invalid credentials ❌";
      toast.error(msg);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen animate-[float_6s_ease-in-out_infinite] px-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Login</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={form.username || ""}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password || ""}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button
            type="submit"
            className="w-full mt-4 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center flex justify-around items-center">
          {credentials.map((credential, index) => (
            <button 
            key={index}
            type="button"
            className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 focus:ring-2 focus:ring-blue-500 outline-none transition text-sm font-medium" 
            onClick={() => {
              setForm({ username: credential.username, password: credential.password });
            }}
          >
            {credential.name}
          </button>
          ))}
        </div>

        {/* <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 transition underline">
              Sign Up
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
