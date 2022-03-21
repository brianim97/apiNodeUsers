const {Router} = require('express');
const { check } = require('express-validator');
const { categorieGet, categorieGetId, categoriePost, categoriePut, categorieDelete } = require('../controllers/categories');
const { existCategorieForID } = require('../helpers/db-validators');
const validarCampos = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');
const { isAdminRol } = require('../middlewares/validar-roles');

const router = Router();

router.get('/',[
    validarJwt
],categorieGet)
router.get('/:id',[
    validarJwt,
    check('id','No es un id compatible').isMongoId(),
    check('id').custom(existCategorieForID),
    validarCampos
],categorieGetId)
router.post('/',[
    validarJwt,
    check('name','El nombren no puede estar vacio').not().isEmpty(),
    validarCampos
],categoriePost)
router.put('/:id',[
    validarJwt,
    check('id','No es un id compatible').isMongoId(),
    check('id').custom(existCategorieForID),
    check('name','El nombren no puede estar vacio').not().isEmpty(),
    validarCampos
],categoriePut)
router.delete('/:id',[
    validarJwt,
    isAdminRol,
    check('id','No es un id compatible').isMongoId(),
    check('id').custom(existCategorieForID),
    validarCampos
],categorieDelete)


module.exports = router;