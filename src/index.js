const express = require("express");
const cors = require("cors");
const conectarBD = require("../config/db")


const app = express();

conectarBD();

app.use(cors());
app.use(express.json());



app.use("/api/usuarios", require("../routes/usuarios"));
app.use("/api/clientes", require("../routes/routesCli"));
app.use("/api/servicios", require("../routes/routesSer"));
app.use("/api/auth", require("../routes/auth"));

const PORT = process.env.PORT || 7000;

app.listen(PORT, ()=>{
    console.log ("el servidor esta iniciado")
})