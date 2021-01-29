require('dotenv').config();

module.exports=function () {
    if(!process.env.PRIVATEKEY){
        console.error('private key not found');
        process.exit(1);
    }
    if(!process.env.PORT){
        console.error('Port not found');
        process.exit(1);
    }
    if(!process.env.MONGO_URL){
        console.error('MONGOURL not found');
        process.exit(1);
    }
};
