const TRAINNER = require("../model/trainnerModel");
const STD = require("../model/stdModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "JSP";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";


const handleTrainnerSignup =async (req,res) => {
    try{
        if (req.body == undefined) {
            return res.status(400).json({ message: "all the fields are mandatory " })
        }

        const {name,email,age,password,role} = req.body;

        if(!email || !name || !age || !password ){
            return res.status(400).json({ message: "input field cannot be empty.. " })
        }

        const isExits = await TRAINNER.findOne({email});

        if(isExits){
            return res.status(400).json({message : "Trainner is already exists"})
        }

        const handlePass = await bcrypt.hash(password, 10);
        await TRAINNER.create({name,email,age,password:handlePass,role})

        return res.status(200).json({message : "Account created successfully"})

    }
    catch(err){ 
            return res.status(500).json({message : "Internal Server Error"})
        }
}

const handleTrainnerLogin = async (req, res) => {
    // return res.json({message : "trainer login"});

    try {
        if (req.body == undefined) {
            return res.status(400).json({ message: "all the fields are mandatory " })
        }        

        const { email, password } = req.body;
        console.log(email,password);
        console.log(2);

        if (!email || !password) {
            return res.status(400).json({ message: "cannot be empty" });
        }

        const isTra = await TRAINNER.findOne({ email });

        if (!isTra) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        const isMatched = await bcrypt.compare(password, isTra.password);

        if (!isMatched) {
            return res.status(400).json({ message: "invalid password" });
        }

        const token = jwt.sign({ email, _id: isTra._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return res.status(200).json({ message: "Login successfull", token });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error in Trainner" })
    }

}

const getTrainerDetails = async (req, res) => {
    try {
        const {_id} = req.payload;
        const isTrainer = await TRAINNER.findOne({ _id }, { password: 0 });
        
        if (!isTrainer) {
            return res.status(401).json({ message: "token not valid because acc has been deleted" });
        }

        return res.status(200).json({ std: isTrainer });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllStd=async(req,res)=>{
    try {
        const stds=await STD.find({},{password:0});
        return res.status(200).json(stds);
    } catch (error) {
        return res.status(500).json({message:"inernal server error"})
    }
}

module.exports = { handleTrainnerLogin, handleTrainnerSignup, getTrainerDetails,getAllStd };