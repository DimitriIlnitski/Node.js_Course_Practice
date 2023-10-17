import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
const app = express();
const port = 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /health-check:
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

app.get("/health-check", (req, res) => {
	res.send(`Health check on port ${port}`);
});

app.get("/", (req, res) => {
	res.send(`General page`);
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
