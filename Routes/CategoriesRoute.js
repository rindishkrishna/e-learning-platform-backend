const Categories =require('../Models/Categories');
const express= require('express');
const Router = express.Router();
const asyncvalidator =require('../Middleware/Async');
const { check, validationResult } = require('express-validator');
const Auth =require('../Middleware/Auth');
const myvalidationResult = validationResult.withDefaults({
    formatter: (error) => {
        return {
            msg: error.msg,
        };
    }
});
/**
 * @swagger
 *
 * /Categories:
 *   get:
 *     description: view the app Categoriess
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:  get app Categories html page made of pug.
 */
Router.get('/',asyncvalidator(async function (req, res) {
    const note = await Categories.find();
    res.send({message:note})
}));
/**
 * @swagger
 *
 * /Categories:
 *   post:
 *     security:
 *       - Bearer: []
 *     description: post app Categories.It requires jwt token "auth" to be passed in headers.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Categories
 *         description: app Categories
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: app Categories
 */
Router.post('/',Auth,check('name','name is empty').not().isEmpty()
    ,asyncvalidator(async (req,res)=>{
    const errors = myvalidationResult(req);
    if(!errors.isEmpty()) return res.status(422).json(errors.array() );
    const re = new Categories({
        name:req.body.name
    });
    await re.save();
    res.send({msg:"Your Categories has been sent"});
}));

module.exports=Router;
