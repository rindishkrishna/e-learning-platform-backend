const mongoose= require('mongoose');
const Courses = require('./Courses');
const Schema = new mongoose.Schema({
    username: {
        type:String,
       
    },
    email:{type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    credits:{
        type:Number,
        default:0
        },
    enrolled:{
        type:mongoose.Types.ObjectId, ref: Courses
    }
});

const Register = mongoose.model('Register',Schema);
module.exports =Register;
