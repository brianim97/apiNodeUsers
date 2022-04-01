
const {response, request} = require('express');
const { subirArchivo } = require('../helpers');

const cargarArchivo = async(req = request,res = response)=>{

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({
        msg:'No hay archivos para subir'
    });
    return;
  }

  try {
    const nombre = await subirArchivo(req.files,['png','jpg'],'img');
    res.json({nombre})
  } catch (msg) {
    res.status(400).json({msg})
  }

 
}

module.exports = {
    cargarArchivo
}