import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";



import Login from "./Pages/LoginPage/Login";
import Register from "./Pages/Register/Register";
import AddStudent from "./components/addStudent/AddStudent";
import StudentTable from "./components/studentTable/StudentTable";
import { Home } from "./components/home/Home";
import ForgetPswd from "./components/forgetpswd/ForgetPswd";
import CertificateGenerator from "./Pages/certificateGenerator/CertificateGenerator";
import { Sidebar } from "./components/sidebar/Sidebar";
import { LogoutBtn } from "./components/logoutBtn/LogoutBtn";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Sidebar />
    <LogoutBtn />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/dashboard" element={<AddStudent />} />
            <Route path="/table" element={<StudentTable />} />
            <Route path="/home" element={<Home />} />
            <Route path="/forgetpswd" element={<ForgetPswd />} />
            <Route path="/certificate" element={<CertificateGenerator />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;