import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DotGrid from "./animation/DotGrid";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
    {/* <div style={{ width: '100%', height: '600px', position: 'relative' }}>
    <DotGrid dotSize={2}
      gap={20}  
      baseColor="#5227FF"
      activeColor="#FF6B6B"
      proximity={100}
      speedTrigger={50}
      shockRadius={200}
      shockStrength={10}
      maxSpeed={3000}
      resistance={500}
      returnDuration={1.5}
      className="dot-grid"
      style={{ position: 'absolute', top: 0, left: 0 }} />
    </div> */}

    {/* <div className="fixed inset-0 -z-10">
  <DotGrid
    dotSize={2}
    gap={20}
    baseColor="#5227FF"
    activeColor="#FF6B6B"
  />
</div> */}

<div className="fixed inset-0 -z-10">
  <DotGrid
    dotSize={2}
    gap={20}
    baseColor="#4f46e5"
    activeColor="#ff4d6d"
  />
</div>

{/* Gradient overlay */}
<div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent to-black/60" />
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;