const {Router} = require('express');
const { check } = require('express-validator');
const { cargarArchivo } = require('../controllers/uploads');
const { isValidRole, existMail, exisUserForID } = require('../helpers/db-validators');
const { isAdminRol , validarCampos, validarJwt } = require('../middlewares');

const router = Router();

router.post('/',cargarArchivo)

module.exports = router;