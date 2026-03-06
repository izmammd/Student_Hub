import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./Component/Pages/Student/Login"
import Profile from "./Component/Pages/Student/Profile"
import Signup from "./Component/Pages/Student/Signup"
import { Toaster } from "react-hot-toast"
import 'bootstrap/dist/css/bootstrap.min.css';
import Updatepassword from "./Component/Pages/Student/Updatepassword"
import Navbar from "./Component/Pages/Student/Navbar"
import { useUser } from "./Component/Context/userContext"
import Subject from "./Component/Pages/Student/Subject"
import ForgotPassword from "./Component/Pages/ForgotPassword"
// import Tprofile from "./Component/Pages/Trainner/Tprofile"

function App() {

  const {isLogin, isInitialized} = useUser();

  // Wait for context to initialize before rendering
  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <>
      
      <BrowserRouter >
        <Toaster></Toaster>
        {isLogin && <Navbar />}
        <Routes>          
          <Route path="/" element={isLogin ? <Navigate to="/profile" /> : <Navigate to="/login" />}  ></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          {/* <Route path="/tprofile" element={<Tprofile />}></Route> */}
          <Route path="/updatepassword" element={<Updatepassword />}></Route>
          <Route path="/subject" element={<Subject />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  ) 
}

export default App
