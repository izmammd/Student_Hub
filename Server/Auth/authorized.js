const authorized=async(req,res,next)=>{
    const {role}=req.payload;

    if(role == 'trainer'){
        next();
    }else{
        return res.status(403).json({message:"you cannot access this resourse"});
    }
}

module.exports=authorized;