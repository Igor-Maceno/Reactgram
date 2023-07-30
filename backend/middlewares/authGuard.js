const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
    const authHeader = req.header["autorization"];
    const token = authHeader && authHeader.split(" ")[1];

    //Check id header has a token
    if(!token) return res.status(401).json({errors: ["Acesso negado!"]});

    //Check if tonken is valid
    try{

        const verified = jwt.verify(token, jwtSecret);

        req.user = await User.findById(verified.id).select("-password");

        next();
    } catch (error){
        res.status(401).json({errors: ["Token inválido."]});
    }
};

module.exports = authGuard