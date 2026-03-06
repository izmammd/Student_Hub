const OTP = require("../model/otpModel");
const STD = require("../model/stdModel");
const TRAINNER = require("../model/trainnerModel");
const sendOtpMail = require("../utils/mail");
const { generateRandomOtp } = require("../utils/otp");
const bcrypt = require("bcrypt");


const handleVerifyEmail = async (req, res) => {

    try {
        if (req.body == undefined) {
            return res.status(400).json({ message: "input field is mandatory to fill" })
        }

        const { email, role } = req.body;

        if (role == "std") {
            const isEmail = await STD.findOne({ email });
            if (!isEmail) {
                return res.status(400).json({ message: "Student Email is not exists" })
            }
        }
        else {
            const isEmail = await TRAINNER.findOne({ email });
            if (!isEmail) {
                return res.status(400).json({ message: "Trainner Email is not exists" })
            }
        }

        return res.status(200).json({ message: "Email verified successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error in Email Verify" })
    }
}

const handleGetOtp = async (req, res) => {
    if (req.body == undefined) {
        return res.status(400).json({ message: "detailsare mandatory to send otp" });
    }
    const { email, role } = req.body;

    if (!email || !role) {
        return res.status(400).json({ message: "all input fields are mandatory to genrate otp" });
    }

    try {
        let isUser;

        if (role == 'std') {
            isUser = await STD.findOne({ email });
        } else {
            isUser = await TRAINNER.findOne({ email });
        }

        if (!isUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const isOtp = await OTP.findOne({ email });

        console.log(1);
        if (isOtp) {
            await OTP.findOneAndDelete({ email });
        }
        console.log(2);
        // GENERATE OTP
        const otp = generateRandomOtp();

        console.log(otp, email);

        await OTP.insertOne({ email, otp });

        const isOtpSend = await sendOtpMail(email, otp);

        if (isOtpSend) {
            return res.status(200).json({ message: "otp has be send to your email" })
        }
        else {
            return res.status(503).json({ message: "otp service is unavialable" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "inernal server error" })
    }

}

const handleVerifyOtp = async (req, res) => {

    if (req.body == undefined) {
        return res.status(400).json({ message: "input field is mandatory to fill" })
    }

    const { otp, email } = req.body;

    if (!otp || !email) {
        return res.status(400).json({ message: "Please fill otp" })
    }

    try {
        const isUser = await OTP.findOne({ email, otp });

        if (!isUser) {
            return res.status(400).json({ message: "incorrect otp" });
        }
        return res.status(200).json({ message: "otp verifyed successfully" })
    }
    catch (error) {
        return res.status(500).json({ message: "inernal server error" })
    }
}

const handleUpdatePassword = async (req, res) => {
    try {
        if (req.body == undefined) {
            return res.status(400).json({ message: "detailsare mandatory to update password using otp" });
        }
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "all input fields are mandatory to change password" });
        }

        const isOtp = await OTP.findOne({ email });

        if (!isOtp) {
            return res.status(400).json({message: "OTP not verified or expired"});
        }

        let isUser;

        if(role == "std"){
            isUser = await STD.findOne({email});
        }
        else{
            isUser = await TRAINNER.findOne({email});
        }

        if(!isUser){
            return res.status(400).json({message: "User not found"});

        }

        const isMatched = await bcrypt.compare(password,isUser.password);

        if(isMatched){
            return res.status(400).json({message : "Password cannot be same as old Password"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (role == 'std') {
            isUser = await STD.findOneAndUpdate({ email }, { $set: { password: hashedPassword } });
        } else {
            isUser = await TRAINNER.findOneAndUpdate({ email }, { $set: { password: hashedPassword } });
        }

        await OTP.findOneAndDelete({ email });

        return res.status(200).json({ message: "password changed successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "inernal server error" })
    }
}

module.exports = { handleVerifyEmail, handleGetOtp, handleVerifyOtp, handleUpdatePassword }