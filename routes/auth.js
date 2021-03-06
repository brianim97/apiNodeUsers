const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, validarJwtEndpoint } = require('../controllers/auth');
const {validarCampos} = require('../middlewares');

const router = Router();

router.post('/login',[
    check('mail','Debe ingresar un correo válido').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login)
router.post('/google',[
    check('id_token','El id_token es necesario').not().isEmpty(),
    validarCampos
],googleSignIn)

router.post('/token-verify',validarJwtEndpoint)

module.exports = router