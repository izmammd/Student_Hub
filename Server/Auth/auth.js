const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "JSP";

const handleAuth = (req,res,next)=>{

    try{
        // console.log(req.headers);
        
        const token = req.headers.authorization?.split(" ")[1];
        // console.log(token);
        

        if(!token){
            return res.status(401).json({message : "provide token"});
        }

        const payload = jwt.verify(token, JWT_SECRET);

        req.payload = payload;

        next();
    }
    catch(err){
        return res.json({message : "invalid or expired token"})
    }
}

module.exports = handleAuth;