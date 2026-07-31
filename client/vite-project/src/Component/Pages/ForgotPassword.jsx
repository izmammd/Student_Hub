import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useUser } from "../Context/userContext";
import { useNavigate } from "react-router-dom";


export default function ForgotPassword() {

    const { user } = useUser();
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const [password, setPassword] = useState("");
    // const [conformpassword,setConformPassword] = useState("");

    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post("https://student-hub-rvpv.onrender.com/api/otp/emailverify", { email, role: user })
            console.log(res.data);
            toast.success(res.data.message);
            setIsEmailVerified(true);
        }
        catch (err) {
            toast.error(err.response.data.message)
            setIsEmailVerified(false);
        }

    }

    const handleGetOtp = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Please wait..")
        try {
            console.log(email, user);

            let res = await axios.post("https://student-hub-rvpv.onrender.com/api/otp/getotp", { email, role: user })
            toast.dismiss(toastId)
            toast.success(res.data.message)
            setStep(step + 1);
        }
        catch (err) {
            toast.dismiss(toastId)
            toast.error(err.response.data.message);
        }
    }

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        try {
            let res = await axios.post("https://student-hub-rvpv.onrender.com/api/otp/verifyotp", { otp, email });
            setStep(step + 1);
            toast.success(res.data.message)
        }
        catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        try {
            let res = await axios.post("https://student-hub-rvpv.onrender.com/api/otp/updatepassword", { email, role: user, password })
            toast.success(res.data.message);
            navigate("/login");
        }
        catch (err) {
            toast.error(err.response.data.message);
        }
    }


    return (<>

        <div className="container d-flex justify-content-center align-items-center vh-100">

            <div className="card shadow p-4" style={{ width: "400px" }}>

                <h2 className="text-center mb-4">Forgot Password : {user}</h2>

                {
                    step == 0 && (
                        <form onSubmit={handleGetOtp}>

                            <div className="mb-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value.trim())}
                                    placeholder="Enter Email..."
                                />
                            </div>

                            <div className="d-flex gap-2">
                                <input
                                    className="btn btn-warning w-50"
                                    onClick={handleVerifyEmail}
                                    type="button"
                                    value="Verify Email"
                                />

                                <input
                                    className="btn btn-primary w-50"
                                    disabled={!isEmailVerified}
                                    type="submit"
                                    value="Send OTP"
                                />
                            </div>

                        </form>)
                }

                {
                    step == 1 && (
                        <form onSubmit={handleVerifyOtp} >

                            <div className="mb-3">
                                <input className="form-control" type="text" onChange={(e) => setOtp(e.target.value)} value={otp} placeholder="Enter OTP" />
                            </div>

                            <div className="d-flex gap-2">
                                <input className="btn btn-secondary w-50" type="button" value="Resend OTP" />

                                <input className="btn btn-success w-50" type="submit" value="Verify OTP" />
                            </div>

                        </form>)
                }

                {
                    step == 2 && (
                        <form onSubmit={handleUpdatePassword} >

                            <div className="mb-3">
                                <input className="form-control" type="text" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter Password" />
                            </div>

                            <input className="btn btn-danger w-100" type="submit" value="Submit" />

                        </form>)
                }

            </div>

        </div>

        {/* <h2>Forgot Password : {user}</h2>

        {
            step == 0 && (<form onSubmit={handleGetOtp} >
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value.trim())} placeholder="Enter Email..."/>
                <input onClick={handleVerifyEmail} type="button" value="verify Email" />
                <input disabled={!isEmailVerified}  type="submit" value="send otp" />
            </form>)
        }

        {
            step == 1 && (<form onSubmit={handleVerifyOtp} >
                <input type="text" onChange={(e)=>setOtp(e.target.value)} value={otp}  placeholder="Enter Otp "/>
                <input type="button" value="resend otp" />
                <input type="submit" value="verify otp" />
            </form>)
        }

        {
            step == 2 && (<form onSubmit={handleUpdatePassword} >
                <input type="text" onChange={(e)=>setPassword(e.target.value)} value={password}  placeholder="Enter Password "/>
                <input type="submit" value="Submit" />
            </form>)
        } */}
    </>)
}