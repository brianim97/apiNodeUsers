const {Router} = require('express');
const { check } = require('express-validator');
const { usersDelete, usersGet, usersPut, usersPost, usersPatch } = require('../controllers/user');
const { isValidRole, existMail, exisUserForID } = require('../helpers/db-validators');
const validarCampos = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');
const { isAdminRol } = require('../middlewares/validar-roles');

const router = Router();

router.get('/',usersGet)

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(exisUserForID),
    // check('rol').custom(isValidRole),
    check('rol').custom(isValidRole),
    validarCampos
],usersPut)

router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña debe contener al menos 6 letras').isLength({min:6}),
    check('mail','El email es invalido').isEmail(),
    check('mail').custom(existMail),
    // check('rol','No es un rol valido').isIn(['ADMIN','REGULAR']),
    check('rol').custom(isValidRole),
    validarCampos
],
usersPost)

router.delete('/:id',[
    validarJwt,
    isAdminRol,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(exisUserForID),
    validarCampos
],usersDelete)

router.patch('/',usersPatch)

module.exports = router;