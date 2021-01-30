const Courses =require('../Models/Courses');
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
 * /Courses:
 *   get:
 *     description: view the app Coursess
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:  get app Courses html page made of pug.
 */
Router.get('/',asyncvalidator(async function (req, res) {
    const note = await Courses.find().populate('category');
    res.send({message:note})
}));
/**
 * @swagger
 *
 * /Courses:
 *   post:
 *     security:
 *       - Bearer: []
 *     description: post app Courses.It requires jwt token "auth" to be passed in headers.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Courses
 *         description: app Courses
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: app Courses
 */
Router.post('/',Auth,check('name','name is empty').not().isEmpty()
    ,asyncvalidator(async (req,res)=>{
    const errors = myvalidationResult(req);
    if(!errors.isEmpty()) return res.status(422).json(errors.array() );
    const re = new Courses({
        name:req.body.name,
        description:req.body.description,
        category:req.body.category,
        duration:req.body.duration,
        lectures:req.body.lectures,
        instructor:req.body.instructor,
        ratings:req.body.ratings,
        reviews:req.body.reviews


    });
    await re.save();
    res.send({msg:"Your Courses has been sent"});
}));

module.exports=Router;
