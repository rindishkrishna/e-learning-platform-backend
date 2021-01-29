const logger = require('../Startup/Logging');
const mongoose = require('mongoose');
require('dotenv').config();
module.exports= function(){
    const db=process.env.MONGO_URL;
    mongoose.connect(db,{ useNewUrlParser: true,  useUnifiedTopology: true ,useFindAndModify:false ,useCreateIndex: true} )
        .then(()=>logger.info('connected to mongo db'))
        .catch(()=>logger.info('db crashed'))
};
