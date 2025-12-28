// JWT VERIFY MIDDLEWARE
const jwt =  require("jsonwebtoken");

module.exports = (req , res , next)=>{
    const authHeader =  req.headers.authorization;                             // Get token from header

    if(!authHeader)                                                             // check token exists
        return res.status(401).json({message:"Token Missing"});

    const token = authHeader.split(' ')[1];                                      //Extract toke (Bearer Token)

    try{
        const decoded =  jwt.verify(token, process.env.JWT_SECRET)              //Verify Token
        req.user = decoded;                                                     // attach user data to request
        next();                
    }catch(err){
        res.status(403).json({message:"Invalid Token"})
    }
}
