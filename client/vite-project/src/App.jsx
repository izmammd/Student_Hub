import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./Component/Login"
import Profile from "./Component/Profile"
import Signup from "./Component/Signup"
import { Toaster } from "react-hot-toast"
import 'bootstrap/dist/css/bootstrap.min.css';
import Updatepassword from "./Component/Updatepassword"
import Navbar from "./Component/Navbar"
import { useUser } from "./Component/Context/userContext"

function App() {

  const token = localStorage.getItem("token");
  const {isLogin} = useUser();

  return (
    <>

      <BrowserRouter >
        <Toaster></Toaster>
        {isLogin && <Navbar />}
        <Routes>          
          <Route path="/" element={token ? <Navigate to="/profile" /> : <Navigate to="/login" />}  ></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/updatepassword" element={<Updatepassword />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
