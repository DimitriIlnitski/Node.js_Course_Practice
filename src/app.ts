import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
const port = 3000;

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "node.js_course_practice",
			version: "1.0.0",
			description: "Documentation for my Node.js API",
		},
	},
	apis: ["./src/app.ts", "./dist/app.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

/**
 * @swagger
 * /api-docs:
 *   get:
 *     summary: Check the health of the application
 *     description: |
 *       Returns a message confirming the health of the application and the port it's running on.
 *     responses:
 *       200:
 *         description: Health check response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health-check", (req, res) => {
	res.send(`Health check on port ${port}`);
});

app.get("/", (req, res) => {
	res.send(`General page`);
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
