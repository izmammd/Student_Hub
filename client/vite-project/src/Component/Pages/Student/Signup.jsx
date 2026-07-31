import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import "../../Style/signup.css";
import { useUser } from "../../Context/userContext";


export default function Signup() {

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        age: "",
        password: "",
    })

    // const [user,setUser] = useState("")
    const { user, setUser } = useUser()

    const navigate = useNavigate();

    const { name, email, age, password } = userDetails;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please select std or trainner before signing up.");
            return;
        }

        try {
            const res = await axios.post(`http://localhost:3000/api/${user}/signup`, { email, name, age, password });
            toast.success(res.data.message);
            navigate("/login");
            // console.log(res);

        }
        catch (err) {
            toast.error(err.response?.data?.message || "Signup failed");
            // console.log(err.message);     
        }

    }

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-card">

                <h2 className="signup-title">Signup</h2>

                <input onChange={handleChange} type="text" name="name" value={name} placeholder="Enter name" className="signup-input" />

                <input onChange={handleChange} type="email" name="email" value={email} placeholder="Enter email" className="signup-input" />

                <input onChange={handleChange} type="number" name="age" value={age} placeholder="Enter age" className="signup-input" />

                <input onChange={handleChange} type="password" name="password" value={password} placeholder="Enter password" className="signup-input" />

                <button type="button" className="signup-btn my-2" onClick={() => setUser("std")}>std Signup</button>
                <button type="button" className="signup-btn my-2" onClick={() => setUser("trainner")}>trainner Signup</button>

                <button type="submit" className="signup-btn my-2">Create Account {user}</button>

                <p style={{ marginTop: "15px", marginLeft: "50px" }}>
                    you have an account?
                    <Link to="/login"> Login</Link>
                </p>

            </form>
        </div>
    );


    // return(<>
    //     <form onSubmit={handleSubmit}>
    //         <input onChange={handleChange} type="text" name="name" value={name} placeholder="enter name"/>
    //         <input onChange={handleChange} type="email" name="email" value={email} placeholder="enter email" />
    //         <input onChange={handleChange} type="number" name="age" value={age} placeholder="enter age" />
    //         <input onChange={handleChange} type="text" name="password" value={password} placeholder="enter password" />
    //         <input type="submit" value="signup" />
    //     </form>
    // </>)
}