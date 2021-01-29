const mongoose= require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type:String,
       
    },
    createdOn: {
        type:Date,
        default:Date.now()
       
    },
    status:{
        type:String,
        enum:['active', 'expired'],
        default:'active'
    }
});
const  Categories= mongoose.model('Categories',Schema);
module.exports =Categories;
