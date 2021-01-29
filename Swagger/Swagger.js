const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    swaggerDefinition: {
        info: {
            title: "Mh-app API Documentation",
            version: "1.0.0",
            description:
                "A documention of Backend API written in Nodejs.",
        },
    },
    apis: ['./Routes/LoginRoute.js','./Routes/RegisterRoute.js','./Routes/PlantsRoute.js']
};
const specs = swaggerJsdoc(options);
module.exports =specs;
