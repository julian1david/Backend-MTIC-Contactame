const mgdb = require('mongoose')
const express = require('express')

const db = require('../databases/db'),
    users = require('../databases/users')

//Aplicamos los endpoints y usamos la modularidad de express a traves de router
const router = express.Router();
//parse todo a JSON
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

//busqueda
//creamos un subrecurso

router.route('/search')
    /**
     * @swagger
     * /search:
     *  get:
     *   description: response the pong message
     *  responses:
     *   200:
     *    description: {"message","pong"}
     */
    .get((req, resp)=>{
        const {mail} = req.query;
        mgdb.model('Users').find({"mail": mail }, (err, users)=>{
            if (err) throw err;
            resp.json(users)
        })
    })

router.route('/')
    /**
     * @swagger
     * /users:
     *  get:
     *      summary: Returns a list of users.
     *      description: Contactame send first 100 users in DB as arrayt the objects.
     *  responses:
     *      200:
     *          description: A User object.
     *          schema:
     *              type: object
     *              properties:
     *                  id:
     *                      type: ObjectId
     *                      example: 619fc8ca9b4b0c1468536c23
     *      400:
     *          description: The specified user ID is invalid (e.g. not a number).
     *      404:
     *          description: A user with the specified ID was not found.
     *      default:
     *          description: Unexpected error
     */
    .get(function (req, resp) {
        mgdb.model('Users').find({}, (err, users) => {
            if (err) throw err;
            resp.json(users)
        })
    })
    //usamos los Verbos (Nivel 3 de API REST)
    /**
     * @swagger
     * /users:
     *  post:
     *   description: response the pong message
     *  responses:
     *   200:
     *    description: {"message","pong"}
     */
    .post((req, resp) => {
        //Mediante el metodo request se traiga la información
        let full_name = req.body.full_name;
        let phone = req.body.phone;
        let address = req.body.address;
        let mail = req.body.mail;

        mgdb.model('Users').create(
            req.body,
            (err, user) => {
            if (err) {
                resp.json({ "message": "user don't save" })
                console.log("Error when to save", err)
            }else{
                console.log("User saved", user)
                resp.json(user)
            }
        })
    })

router.route('/:id')
    .get((req, resp)=>{
        mgdb.model('Users').findById(req.params.id, 
            (err,user)=>{
                if(err){
                    console.log("There was an error", err)
                }
                else{
                    console.log("Retriving id", req.params.id)
                    resp.json(user)
                }
            })
    })
    /**
     * @swagger
     * /users/id:
     *  put:
     *   description: response the pong message
     *  responses:
     *   200:
     *    description: {"message","pong"}
     */
    .put((req, resp)=>{
        mgdb.model('Users').findById(req.params.id, 
            (err,user)=>{
                if(err){
                    console.log("There was an error", err)
                }
                else{
                    console.log("Updating id", req.params.id)
                    user.updateOne(req.body,(err,data )=>{
                        if(err) resp.json({"message": "hasn't been updated"})
                        resp.json({
                            "_id":user._id,
                            "message":"Has been updated"
                        })
                    })
                }
            })
    })
    /**
     * @swagger
     * /users/id:
     *  delete:
     *   description: response the pong message
     *  responses:
     *   200:
     *    description: {"message","pong"}
     */
    .delete((req, resp)=>{
        mgdb.model('Users').findById(req.params.id, 
            (err,user)=>{
                if(err){
                    console.log("There was an error", err)
                }
                else{
                    //En varios entornos es mejor no borrar nada por lo cual 
                    //en el modelado de disseño de bases de datos se usa un campo "enable"
                    console.log("Delete id", req.params.id)
                    user.remove((err,user)=>{
                        if(err) resp.json({"message": "Has't been deleted"})
                        resp.json({
                            "message": "Has been deleted"
                        })
                    })
                }
            })
    })

module.exports = router