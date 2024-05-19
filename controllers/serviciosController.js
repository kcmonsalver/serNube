const Servicio = require('../models/Servicios');


exports.buscarServicios = async(req,res) => {

try{
    const servicio = await Servicio.find();
    res.json(servicio)

}catch(error){
    console.log(error)
    res.status(500).send('hubo un error al buscar el servicio ')
}

}

exports.agregarServicio = async(req,res) =>{

    try{

        let servicios;
        servicios = new Servicio (req.body)
        await servicios.save();
        res.send(servicios);


    } catch (error){
        console.log(error)
        res.status(500).send('hubo un error al agregar un servicio')
    }
}

exports.buscarServicio = async (req,res) => {

    try {
        let servicio = await Servicio.findById(req.params.id);
        if(!servicio){
            res.status(400).json({msg: "no se encuentra el servicio con ese ID"})
            return
        }

        res.send(servicio);
        
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error al buscar el servicio');
    }
}

exports.eliminarServicio = async (req,res)=>{

    try {
        let servicio = await Servicio.findById(req.params.id);
        if(!servicio){
            res.status(404).json({msg: "no se encuentra el servicio con ese ID"})
            return
        }

        await Servicio.findOneAndDelete({_id: req.params.id});
        res.json({msg: 'el servicio a sido eliminado'});
        return

    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error al eliminar el servicio');
    }

}

exports.actualizarServicio = async(req,res)=>{
    
    try {
        
    const {nombre, tipo, precio, modalidad} = req.body
    let servicio = await Servicio.findById(req.params.id);

        if(!servicio){
            res.status(404).json({msg: 'el servicio no existe'});
        }else{
            servicio.nombre = nombre;
            servicio.tipo = tipo;
            servicio.precio = precio;
            servicio.modalidad = modalidad;

            servicio = await Servicio.findOneAndUpdate({_id: req.params.id}, servicio,{new:true});
            res.json(servicio);
            return
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error al actualizar el servicio');
       return
    }
}