const accountModel = require("../models/account.model")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

async function authMiddleware(req, res, next) {
    const token = req.cookies.token || req.header("authorization")?.split(" ")[1]
    console.log(token);
    
    if(!token){
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findOne({ _id: decoded.userId })
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }
}

module.exports = {
    authMiddleware
}