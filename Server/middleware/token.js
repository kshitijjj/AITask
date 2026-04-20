import jwt from 'jsonwebtoken';

export const verifyToken=async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader)return res.status(404).json({message:"Token not found"});
    const token=authHeader.split(" ")[1];
    try {
        const decode=jwt.decode(token,process.env.secretKey);
        req.user=decode;
        next();
    } catch (error) {
        console.log(error.message)
    }
}
export default verifyToken;