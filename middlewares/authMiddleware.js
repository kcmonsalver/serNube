
const jwt= require("jsonwebtoken");


module.exports = function(req, res, next){

    const token = req.header ("x-auth-token");
    
    if(!token){
        return res.status(400).json({msg: "no se encuentra un token"})
    }

    try {
        const cifrado = jwt.verify(token, process.env.SECRETA)
        req.usuario= cifrado.usuario;
        next();
    } catch (error) {
        res.status(400).json({msg: "token no valido"})
    }
}