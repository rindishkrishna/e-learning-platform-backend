const plants =require('../Models/Courses');
const express= require('express');
const Router = express.Router();
const asyncvalidator =require('../Middleware/Async');
const { check, validationResult } = require('express-validator');
const auth= require('../Middleware/Auth');
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
 * /plants:
 *   get:
 *     description: view the list of indoor plants.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:  get the list of indoor plants.
 */
Router.get('/',asyncvalidator(async function (req, res) {
    const plant = await plants.find().sort({'date': 'desc'});
    res.send(plant);
}));
/**
 * @swagger
 *
 * /plants:
 *   post:
 *     security:
 *       - Bearer: []
 *     description: post indoor plants details.It requires jwt token "auth" to be passed in headers.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: plant name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: image
 *         description: url of plant image
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: description of the plant
 *         in: formData
 *         required: true
 *         type: string
 *       - name: category
 *         description: category of indoor plant
 *         in: formData
 *         required: true
 *         type: string
 *       - name: sunlight
 *         description: amount of sunlight required
 *         in: formData
 *         required: true
 *         type: string
 *       - name: water
 *         description: how often to water them
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Your indoor plant is added.
 */
Router.post('/',auth,check('name','name is empty').not().isEmpty()
    ,check('image','image is empty').not().isEmpty()
    ,check('description','description is empty').not().isEmpty()
    ,check('category','category is empty').not().isEmpty()
    ,check('water','water is empty').not().isEmpty()
    ,check('sunlight','sunlight is empty').not().isEmpty()
    ,asyncvalidator(async (req,res)=>{
    const errors = myvalidationResult(req);
    if(!errors.isEmpty()) return res.status(422).json(errors.array() );
    const re = new plants({
        name:req.body.name,
        image:req.body.image,
        description:req.body.description,
        category:req.body.category,
        water:req.body.water,
        sunlight:req.body.sunlight
    });
    await re.save();
    res.send({msg:"Your indoor plant is added."});
}));

module.exports=Router;
