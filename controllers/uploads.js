
const fs = require('fs')
const {response, request} = require('express');
const path = require('path');
const { subirArchivo } = require('../helpers');
const Product = require('../models/product');
const User = require('../models/user');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL)

const cargarArchivo = async(req = request,res = response)=>{
  try {
    const nombre = await subirArchivo(req.files,['png','jpg'],'img');
    res.json({nombre})
  } catch (msg) {
    res.status(400).json({msg})
  }
}

const actualizarImagen = async(req = request, res= response)=>{
  const {id,coleccion} = req.params;
  
  let modelo;

  switch (coleccion) {
    case 'users':
      modelo = await User.findById(id);
      if(!modelo){
        return res.status(400).json({msg:`No existe un usuario con el id ${id}`})
      }
      break;
      case 'products':
        modelo = await Product.findById(id);
        if(!modelo){
          return res.status(400).json({msg:`No existe un producto con el id ${id}`})
        }
        break;
  
    default:
      return res.status(500).json({msg:'Se me olvido validar esto'})
  }

  
  

try {

  //Limpiar imagenes previas
  if(modelo.img){

    //hay que borrar la imagen del servidor
    const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
    if(fs.existsSync(pathImagen)){
      fs.unlinkSync(pathImagen)
    }
  }
  const nombre = await subirArchivo(req.files,undefined,coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo)
} catch (error) {
  return res.status(400).json({msg:`Error al actualizar imagen ${error}`})
}
}

const actualizarImagenCloudinary = async(req = request, res= response)=>{
  const {id,coleccion} = req.params;
  
  let modelo;

  switch (coleccion) {
    case 'users':
      modelo = await User.findById(id);
      if(!modelo){
        return res.status(400).json({msg:`No existe un usuario con el id ${id}`})
      }
      break;
      case 'products':
        modelo = await Product.findById(id);
        if(!modelo){
          return res.status(400).json({msg:`No existe un producto con el id ${id}`})
        }
        break;
  
    default:
      return res.status(500).json({msg:'Se me olvido validar esto'})
  }

  
  

try {

  //Limpiar imagenes previas
  if(modelo.img){
    //hay que borrar la imagen del servidor
    const nombreArr = modelo.img.split('/')
    let nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split('.')
    cloudinary.uploader.destroy(public_id);
   
  }
  const {tempFilePath} = req.files.archivo
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
  modelo.img = secure_url
  await modelo.save();
  res.json(modelo)

} catch (error) {
  return res.status(400).json({msg:`Error al actualizar imagen ${error}`})
}
}

const mostrarImagen = async(req = request, res= response)=>{

  const {id,coleccion} = req.params;
  
  let modelo;

  switch (coleccion) {
    case 'users':
      modelo = await User.findById(id);
      if(!modelo){
        return res.status(400).json({msg:`No existe un usuario con el id ${id}`})
      }
      break;
      case 'products':
        modelo = await Product.findById(id);
        if(!modelo){
          return res.status(400).json({msg:`No existe un producto con el id ${id}`})
        }
        break;
  
    default:
      return res.status(500).json({msg:'Se me olvido validar esto'})
  }

  
  

try {
  if(modelo.img){
    const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
    if(fs.existsSync(pathImagen)){
     return res.sendFile(pathImagen)
    }
  }
  const pathImagen = path.join(__dirname,'../assets/no-image.jpg');
  res.sendFile(pathImagen)

} catch (error) {
  return res.status(400).json({msg:`Error al recuperar imagen ${error}`})
}
}
module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}