import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import "../../Style/login.css"
import { useUser } from "../../Context/userContext";


export default function Login() {

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })

    // const [user,setUser] = useState("");
    const { user, setUser } = useUser()

    const isUser = localStorage.getItem("user");
    if (isUser) {
        localStorage.removeItem("user");
    }

    const { email, password } = userDetails;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(`https://student-hub-rvpv.onrender.com/api/${user}/login`, { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", user);
            toast.success(res.data.message);

            navigate("/profile");
        }
        catch (err) {
            toast.error(err.response.data.message)
        }
    }

    // const handleFor = ()=>{
    //     navigate("/updatepassword");
    // }

    return (<>

        <div className="container d-flex justify-content-center align-items-center vh-100">

            <div className="card shadow p-4" style={{ width: "400px" }}>

                <h2 className="text-center mb-4">Login</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <input onChange={handleChange} type="text" className="form-control" name="email" value={email} placeholder="Enter Email" />
                    </div>

                    <div className="mb-3">
                        <input onChange={handleChange} type="password" className="form-control" name="password" placeholder="Enter Password" />
                    </div>

                    {/* user buttons */}
                    <div className="d-flex gap-2 mb-3">
                        <button type="button" className="btn btn-warning w-50" onClick={() => {setUser("std");localStorage.setItem("user", "std")}}>Std</button>

                        <button type="button" className="btn btn-info w-50" onClick={() => {setUser("trainner");localStorage.setItem("user", "trainner")}}>Trainer</button>
                    </div>

                    <button className="btn btn-primary w-100 mb-2">Login {user}</button>

                    <button type="button" className="btn btn-danger w-100" onClick={() => {user ? navigate("/forgotPassword") : toast.error("First select std or trainer")}}>Forgot Password : {user}</button>

                </form>

                <p className="text-center mt-3">Don’t have account?<Link to="/signup"> Signup</Link></p>

            </div>

        </div>
        {/* <div className="login-wrapper">
            <form onSubmit={handleSubmit} className="login-card">
                <h1 className="login-title">Login</h1>
                <input onChange={handleChange} type="text" className="login-input" name="email" value={email} placeholder="enter email" />
                <input onChange={handleChange} type="text" className="login-input" name="password" value={password} placeholder="enter password" />
    
                <input type="button" className="login-btn my-2" value="std" onClick={()=>{setUser("std");localStorage.setItem("user","std")}}/>
                <input type="button" className="login-btn my-2" value="trainner" onClick={()=>{setUser("trainner");localStorage.setItem("user","trainner")}} />

                <input type="submit" className="login-btn my-2" value={`Login ${user}`} />

                <input type="button" className="btn btn-danger " value= {`Forgot Password : ${user}`}  onClick={()=>{user?navigate("/forgotPassword"):toast.error("first select std or trainner")}} />

                <p style={{ marginTop: "15px" }}>
                    Don’t have account?
                    <Link to="/signup"> Signup</Link>
                </p>
            </form>
        </div> */}

    </>)
}