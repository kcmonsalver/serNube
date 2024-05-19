const mongoose = require('mongoose');

const servicioSchema = mongoose.Schema({

    nombre:{
        type: String,
        require: true
    },

    tipo:{
        type: String,
        require: true
    },

    precio:{
        type: Number,
        require: true
    },

    modalidad:{
        type: String,
        require: true
    },

},{versionkey:false});

module.exports = mongoose.model('Servicios', servicioSchema);