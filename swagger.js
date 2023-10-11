const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "node.js_course_practice",
			version: "1.0.0",
			description: "Documentation for my Node.js API",
		},
	},
	apis: ["./app.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
