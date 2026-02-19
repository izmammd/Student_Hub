import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import "./Style/login.css"


export default function Login() {

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })

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
            let res = await axios.post("http://localhost:3000/api/std/login", { email, password });
            localStorage.setItem("token", res.data.token);
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
        <div className="login-wrapper">
            <form onSubmit={handleSubmit} className="login-card">
                <h1 className="login-title">Login</h1>
                <input onChange={handleChange} type="text" className="login-input" name="email" value={email} placeholder="enter email" />
                <input onChange={handleChange} type="text" className="login-input" name="password" value={password} placeholder="enter password" />
                <input type="submit" className="login-btn" value="login" />
                {/* <button onClick={handleFor} className="forgot-btn my-2">forgot password</button> */}
                <p style={{ marginTop: "15px" }}>
                    Don’t have account?
                    <Link to="/signup"> Signup</Link>
                </p>
            </form>
        </div>

    </>)
}