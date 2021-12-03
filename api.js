const dotenv = require('dotenv').config()
const app = require('./routes')
const port = process.env.PORT || 5000

//el puerto de escucha (se usan callback)
//(una funcion callback es una funcion que se ejecuta cuando se cumple una promesa)
const server = app.listen(port,()=>{
    let host = server.address().address;
    if(process.env.NODE_ENV !== "production") console.log('server listening at ',host, port)
})