const {Router} = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { isValidRole, existMail, exisUserForID, coleccionesPermitidas } = require('../helpers');
const { isAdminRol , validarCampos, validarJwt, validarArchivoSubir } = require('../middlewares');

const router = Router();

router.post('/',validarArchivoSubir,cargarArchivo)
router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id no es un id de mongo valido').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['users','products'])),
    validarCampos
],actualizarImagenCloudinary)
router.get('/:coleccion/:id',[
    check('id','El id no es un id de mongo valido').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['users','products'])),
    validarCampos
],mostrarImagen)

module.exports = router;