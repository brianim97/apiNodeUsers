const {Router} = require('express');
const { check } = require('express-validator');
const { usersDelete, usersGet, usersPut, usersPost, usersPatch } = require('../controllers/user');
const { isValidRole, existMail, exisUserForID } = require('../helpers/db-validators');
// const {validarCampos,validarJwt,isAdminRol,haveRol} = require('../middlewares')
const { isAdminRol , validarCampos, validarJwt, haveRol } = require('../middlewares');
const router = Router();

router.get('/',[validarJwt],
usersGet)

router.put('/:id',[
    validarJwt,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(exisUserForID),
    // check('rol').custom(isValidRole),
    check('rol').custom(isValidRole),
    validarCampos
],usersPut)

router.post('/',[
    validarJwt,
    isAdminRol,
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
    // isAdminRol,
    haveRol('ADMIN'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(exisUserForID),
    validarCampos
],usersDelete)


module.exports = router;