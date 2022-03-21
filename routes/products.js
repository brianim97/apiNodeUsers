const {Router} = require('express');
const { check } = require('express-validator');
const { productGet, productGetId, productPost, productPut, productDelete } = require('../controllers/products');
const { existProductForID, existCategorieForID } = require('../helpers/db-validators');
const validarCampos = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');
const { isAdminRol } = require('../middlewares/validar-roles');


const router = Router();

router.get('/',[
    validarJwt
],productGet)
router.get('/:id',[
    validarJwt,
    check('id','No es un id compatible').isMongoId(),
    check('id').custom(existProductForID),
    validarCampos
],productGetId)
router.post('/',[
    validarJwt,
    check('name','El nombren no puede estar vacio').not().isEmpty(),
    check('categorie','No es un id de mongo').isMongoId(),
    check('categorie').custom(existCategorieForID),
    validarCampos
],productPost)
router.put('/:id',[
    validarJwt,
    check('id','No es un id compatible').isMongoId(),
    check('id').custom(existProductForID),
    check('categorie').custom(existCategorieForID),
    validarCampos
],productPut)
router.delete('/:id',[
    validarJwt,
    isAdminRol,
    check('id','No es un id compatible').isMongoId(),
    check('id').custom(existProductForID),
    validarCampos
],productDelete)


module.exports = router;