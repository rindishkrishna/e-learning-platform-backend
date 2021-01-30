const Register =require('../Models/Register');
const bcrypt =require('bcrypt');
const express= require('express');
const Router = express.Router();
const asyncvalidator =require('../Middleware/Async');
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');
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
 * /register:
 *   post:
 *     description: Register to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Username
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *         type: string
 *       - name: confirmPassword
 *         description: confirm Password
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Registers a user
 */
Router.get('/',
    asyncvalidator(async (req,res)=>{
        const errors = myvalidationResult(req);
        if(!errors.isEmpty()) return res.status(422).json(errors.array() );
    const user = await Register.find();
    if(!user) return res.status(404).send("not found");
    res.send(user);
}));

Router.get('/:id',
    asyncvalidator(async (req,res)=>{
        const errors = myvalidationResult(req);
        if(!errors.isEmpty()) return res.status(422).json(errors.array() );
    const user = await Register.findById(req.params.id);
    if(!user) return res.status(404).send("not found");
    res.send(user);
}));


Router.post('/',[
    check('email','Email is Required').isEmail(),
    check('password','password must be min. 6 characters.').isLength({min:6})
],asyncvalidator(async (req,res)=>{
    const errors = myvalidationResult(req);
    if(!errors.isEmpty()) return res.status(422).json(errors.array());
    let user = await Register.findOne({'email':req.body.email});
    if(user) return res.status(400).send([{msg:"Already have account"}]);

    user= new Register({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
        
    });
    const salt =await bcrypt.genSalt(5);
    user.password =await bcrypt.hash(user.password ,salt);
    const salt1 =await bcrypt.genSalt(5);
    await user.save();
    const token = jwt.sign({id: user._id,username:user.username},process.env.PRIVATEKEY);
    res.send({token:token});

}));

Router.put('/:id',
    asyncvalidator(async (req,res)=>{
        const errors = myvalidationResult(req);
        if(!errors.isEmpty()) return res.status(422).json(errors.array() );
    const user = await Register.findByIdAndUpdate(req.params.id , {
        username:req.body.username,
        gender:req.body.gender,
        age:req.body.age,
        credits:req.body.credits,
        enrolled:req.body.enrolled
    }, { new: true });
    if(!user) return res.status(404).send("not found");
    res.send(user);
}));

module.exports=Router;
