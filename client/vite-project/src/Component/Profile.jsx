import axios from "axios";
import { useEffect } from "react"
import toast from "react-hot-toast";
import "./Style/profile.css"
import { useNavigate } from "react-router-dom";
import { useUser } from "./Context/userContext";


export default function Profile() {

    const {userDetails,setUserDetails,setIsLogin} = useUser()
    const navigate = useNavigate();
    // const [userDetails, setUserDetails] = useState({});

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        if(!token){
            return navigate("/login");
        }
        try {
            let res = await axios.get("http://localhost:3000/api/std/get", {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Authorization : `Bearer ${token}`,
                    "Content-Type" : "application/json",
                }
            });
            setUserDetails(res.data.std);
            setIsLogin(true);

        }
        catch (err) {
            toast.error(err.response.data.message);
            localStorage.removeItem("token");
            setIsLogin(false);
            navigate("/login");
        }
    }

    useEffect(() => {
        fetchData();
    }, [])


    console.log(userDetails);

    return (<>
        <h1 className="text-center profile-title">Profile</h1>

        {userDetails ? (
            <section className="mt-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-4">

                            <div className="card text-center shadow profile-card">
                                <img src="#" className="card-img-top profile-img" alt="profile Image reload" />

                                <div className="card-body profile-body">
                                    <h2>{userDetails.name}</h2>
                                    <h5>Age: {userDetails.age}</h5>
                                    <h6>Role: {userDetails.role}</h6>
                                    <button className="btn btn-primary" onClick={()=> navigate("/updatepassword")}>Update Password</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        ) : <h1 className="text-center profile-title">something is wrong</h1>}
    </>)
}