import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import { useUser } from "../../Context/userContext";

export default function Updatepassword() {

    const navigate = useNavigate();
    const { setIsLogin } = useUser();

    const [pass, setPass] = useState({
        password: "",
        newPassword: ""
    })

    const { password, newPassword } = pass;

    const handlePass = (e) => {
        const { name, value } = e.target;
        setPass((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token")
            if (!token) {
                toast.error("Please login before updating password.");
                navigate("/login");
                return;
            }

            const role = localStorage.getItem("user") || "std";
            const res = await axios.patch(`https://student-hub-rvpv.onrender.com/api/${role}/updatepassword`,
                { password, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(res.data.message);
            localStorage.removeItem("token");
            
            navigate("/login");  
            setIsLogin(false); 

        }
        catch (err) {
            toast.error(err.response.data.message);
            localStorage.removeItem("token");
        }

    }

    return (<>

        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow p-4">
                        <h3 className="text-center mb-4">Update Password</h3>
                        <form onSubmit={handleSubmit}>

                            <input type="password" className="form-control mb-3" name="password" value={password} onChange={handlePass} placeholder="Enter old password" />
                            <input type="password" className="form-control mb-3" name="newPassword" value={newPassword} onChange={handlePass} placeholder="Enter new password" />
                            <button type="submit" className="btn btn-primary w-100 mb-3">Update Password </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    </>)
}

