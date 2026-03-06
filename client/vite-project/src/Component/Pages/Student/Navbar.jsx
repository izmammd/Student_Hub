import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/userContext";

export default function Navbar() {

    const navigate = useNavigate();
    const { setIsLogin } = useUser();

    const handleLogout = () => {
        // const token = localStorage.getItem("token");
        localStorage.removeItem("token");
        setIsLogin(false);
        navigate("/login");

    }


    return (<>

        <nav className="navbar bg-dark">
            <div className="d-flex justify-content-start align-items-center">
                <div className="navbar-brand text-white"><b className="p-3">Student Hub</b></div>

                <div className="text-white w-50 d-flex justify-content-around g-5">
                    {/* <Link to="/home">Home</Link>
                <Link to="/Signup">Signup</Link>
                <Link to="/login">Login</Link> */}
                    <Link className="nav-link" to="/profile">Profile</Link>
                    <Link className="nav-link mx-2" to="/subject">Subject</Link>
                </div>
            </div>

            <div className="me-3">
                <button className="btn btn-danger btn-sm" onClick={handleLogout}>LogOut</button>
            </div>
        </nav>

    </>)
}