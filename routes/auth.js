const express = require ("express");
const router = express.Router();
const authController = require ("../controllers/authController");
const {check} = require ("express-validator");
const auth = require ("../middlewares/authMiddleware");


router.post("/",[
    check("email", "agrega un email valido").isEmail(),
    check("password", "el password debe contener minimo 10 caracteres").isLength({min:10,}),
],
authController.autenticarUsuario
);

router.get("/",auth, authController.usuarioAutenticado);

module.exports = router; 