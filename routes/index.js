

const swaggerJsDoc =  require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument =  require("../swagger.json");
const specs = swaggerJsDoc(swaggerDocument)

const express = require('express')
//Framework que nos permite a usar los endpoint
const app = express();
//uso de routas
const userRoutes = require('./users');
const cors =require("cors");
app.use(cors({origin:"*"}))

//endpoint es igual a 'user' Nivel 2 de una APIREST
app.use('/users', userRoutes)

/**
 * @swagger
 * /ping:
 *  get:
 *   description: response the pong message
 *  responses:
 *   200:
 *    description: {"message","pong"}
 */
app.get("/ping", (req, resp)=>{
    resp.json({ 
        "message":"pong"
    })
})

app.use('/', swaggerUI.serve, swaggerUI.setup(specs))

module.exports = app;