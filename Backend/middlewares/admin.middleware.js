export const adminMiddleware = (req,res,next) =>{
    if (!req.user || req.user.role !== "admin"){
        return res.status(401).json({
            success:false,
            message:"Admin access required"
        })
    }
    next()
}

