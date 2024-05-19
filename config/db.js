const mongoose  = require('mongoose');

require('dotenv').config({path:".env"});

const conectarBD = async () => {
    
    mongoose

    .connect(process.env.DB_MONGO)
    .then(() => console.log(' estamos conectados con mongo'))
    .catch((err) => console.error(err));
    
    mongoose.set('debug', true);

}

module.exports = conectarBD;