import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.scss";

import Home from "./pages/Home.tsx";
import Giaovien from "./pages/Giaovien.tsx";
import Khoahoc from "./pages/Khoahoc.tsx";
import Trainghiem from "./pages/Trainghiem.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Student from "./pages/Student.tsx";
import Admin from "./pages/Admin.tsx";

import { UserContextProvider } from "./context/UserContext.tsx";

axios.defaults.baseURL = "https://enghub-auth-h.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Toaster position="top-left" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/giaovien" element={<Giaovien />} />
        <Route path="/khoahoc" element={<Khoahoc />} />
        <Route path="/trainghiemhoc" element={<Trainghiem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<Student />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
