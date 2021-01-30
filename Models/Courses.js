const mongoose= require('mongoose');
const Categories = require("./Categories");
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const Schema = new mongoose.Schema({
    name: {
        type:String,
       
    },
    description: {
        type:String,
       
    },
    createdOn: {
        type:Date,
        default:Date.now()
       
    },
    category: {
        type:mongoose.Types.ObjectId, ref: Categories
       
    },
    duration: {
        type:Number,
       
    },
    status:{
        type:String,
        enum:['active', 'expired'],
        default:'active'
    },
    lectures:[{
        type:String
    }],
    instructor:{
        type:String
    },
    ratings:{
        type:Number
    },
    reviews:[{
        type:String
    }]
});
Schema.plugin(mongoose_fuzzy_searching, { fields: ['name'] });
const  Courses= mongoose.model('Courses',Schema);
module.exports =Courses;
