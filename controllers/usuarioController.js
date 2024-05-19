const Usuarios = require("../models/Usuarios");
const bcryptjs = require("bcryptjs");
const { validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");


exports.crearUsuario = async (req, res) => {
    console.log("Solicitud de creación de usuario recibida...", req.body);

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        console.log("Errores de validación:", errores.array());
        return res.status(400).json({errores: errores.array() });
    }

    const {  email,password} = req.body;
    try {
        let usuario = await Usuarios.findOne({ email });

        if (usuario) {
            console.log("El usuario ya existe:", usuario);
            return res.status(400).json({ msg: "El usuario ya existe" })
        }


        usuario = new Usuarios(req.body);
        usuario.password = await bcryptjs.hash(password, 10);


        await usuario.save();

        const payload = {
            usuario: { id: usuario.id},

        };

        jwt.sign(
            payload,
            process.env.SECRETA, 
            {
                expiresIn: 3600,
            },
            (error, token) => {
                if (error) throw error;
                res.json({ token  });
            }
        );

    } catch (error) {
        console.log("hay un error");
        console.log(error);
        res.status(400).send("hubo un error");
        console.log("Error al crear usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
}