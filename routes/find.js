const {Router} = require('express');
const { find } = require('../controllers/find');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:colection/:term',[
    validarJwt
],find)

module.exports = router;