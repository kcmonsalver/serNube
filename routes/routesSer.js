const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/serviciosController');


router.post('/', serviciosController.agregarServicio);
router.get('/', serviciosController.buscarServicios);
router.get('/:id', serviciosController.buscarServicio);
router.delete('/:id', serviciosController.eliminarServicio);
router.put('/:id', serviciosController.actualizarServicio);

module.exports = router;