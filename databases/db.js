const dotenv = require('dotenv').config()

//Va a tener la conexión a la bd
//se usa un ODM (Object document Mapping) (se maneja por SCHEMAS)
//con el ODM se modela el JSON (averiguar un patron de diseño)
const mgdb = require('mongoose');
mgdb.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.BD_NAME}`,(err, db)=>{
    //usamos una promesa
    if(err) throw err;
    if(process.env.NODE_ENV !== "production") console.log("Success ! Database conected")
});

module.exports = mgdb
