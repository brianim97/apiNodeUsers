const createJwt = require('./createJwt');
const dbValidators = require('./db-validators');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');


module.exports = {
    ...createJwt,
    ...dbValidators,
    ...googleVerify,
    ...subirArchivo
}



