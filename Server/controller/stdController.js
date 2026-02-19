const STD = require("../model/stdModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const handleStdSignup = async (req, res) => {

    // return res.json({message : "contoller response work"})  // for testing

    try {
        // console.log("req body", req.body);


        if (req.body == undefined) {
            return res.status(400).json({ message: "details are mandatory to fill" })
        }

        const { email, password, name, age, role } = req.body;

        if (!email || !password || !name || !age) {
            return res.status(400).json({ message: "all input field are mandatory to fill" })
        }

        const isStd = await STD.findOne({ email });

        if (isStd) {
            return res.status(400).json({ message: "student already exists" })
        }

        const handlePass = await bcrypt.hash(password, 10);
        const isCreated = await STD.create({ email, password: handlePass, name, age, role })
        return res.status(201).json({ message: "Student account create successfully" });
    }
    catch (err) {
        console.log(err);

        return res.status(500).json({ message: "internal Error" });
    }
}

const handleStdLogin = async (req, res) => {

    try {
        // console.log("req body", req.body);
        if (req.body == undefined) {
            return res.status(400).json({ message: "all the field is mandatory to Login" });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "all input field is mandatory" });
        }

        const isStd = await STD.findOne({ email });

        if (!isStd) {
            return res.status(400).json({ message: "invalid email" });
        }

        const isMatched = await bcrypt.compare(password, isStd.password);

        if (!isMatched) {
            return res.status(400).json({ message: "invalid password" });
        }

        const token = jwt.sign({ email, _id: isStd._id }, "JSP", { expiresIn: "1h" });

        return res.status(200).json({ message: "Login successfull", token });
    }
    catch (err) {
        return res.status(500).json({ message: "internal Error" })
    }
}

const getStdDetails = async (req, res) => {

    // console.log(req.payload);
    try {
        const _id = req.payload;
        const isStd = await STD.findOne({ _id }, { password: 0 });

        if (!isStd) {
            return res.status(401).json({ message: "token not valid beacuse acc has been deleted" })
        }
        // console.log("work");
        return res.status(200).json({ std: isStd });
    }
    catch (err) {
        return res.status(500).json({ message: "internal server Error" })
    }
}

const handlStdUpdatename = async (req, res) => {
    try {
        // console.log(payload);
        const { _id } = req.payload;

        // console.log("work",req.body);

        if (req.body == undefined) {
            return res.status(400).json({ message: "input fiels are mandatory to fill" })
        }

        const { name } = req.body;

        if (!name) {
            return res.json({ message: "input field cannot be empty" })
        }

        const isStd = await STD.findById({ _id });

        if (!isStd) {
            return res.status(401).json({ message: "token not valid beacuse acc has been deleted" })
        }

        if (name == isStd.name) {
            return res.status(400).json({ message: "name cannot be same" })
        }

        isStd.name = name;

        await isStd.save();
        return res.json({ message: "name update successfully" })

    }
    catch (err) {
        return res.status(500).json({ message: "internal Server Error" });
    }
}

const handleStdUpdatePassword = async (req, res) => {

    try {
        const { _id } = req.payload;

        const isStd =await STD.findById({ _id });
       
        
        if (!isStd) {
            return res.status(400).json({ message: "token not valid beacuse acc has been deleted" })
        }

        if (req.body == undefined) {
            return res.status(400).json({ message: "details are mandatory to Update Student Password" })
        }

        const { password, newPassword } = req.body;

        if (!password || !newPassword) {
            return res.status(400).json({ message: "input field cannot be empty" });
        }

    
        
        const isMatched = await bcrypt.compare(password, isStd.password);


        if (!isMatched) {
            return res.status(401).json({ message: "you enter incorrect password" });
        }

        if (password == newPassword) {
            return res.status(400).json({ message: "Password cannot be same as Old Password" });
        }
        const handleNewPass = await bcrypt.hash(newPassword, 10);

        isStd.password = handleNewPass;
        await isStd.save();

        return res.status(200).json({ message: "Student password Update Successfully" })
    }
    catch (err) {
        console.log("err = " ,err.message);
        return res.status(500).json({ message: "Internal Server Error " });
    }

}

const handleStdDelete = async (req,res)=>{
    console.log("work");
    
}

module.exports = { handleStdSignup, handleStdLogin, getStdDetails, handlStdUpdatename, handleStdUpdatePassword, handleStdDelete };