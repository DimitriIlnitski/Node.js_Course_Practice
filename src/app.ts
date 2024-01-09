import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import movieRoutes from "./routes/movieRoutes";
import genreRoutes from "./routes/genreRoutes";

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

if (!process.env.DB_CONNECTION) {
	console.error("DB_CONNECTION is not defined in the .env file");
	process.exit(1); 
}
mongoose.connect(process.env.DB_CONNECTION);

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "node.js_course_practice",
			version: "1.0.0",
			description: "Documentation for my Node.js API",
		},
		components: {
			schemas: {
				Movie: {
					type: "object",
					properties: {
						title: {
							type: "string",
							description: "Title of the movie",
						},
						description: {
							type: "string",
							description: "Description of the movie",
						},
						releaseDate: {
							type: "string",
							format: "date",
							description: "Release date of the movie",
						},
						genre: {
							type: "array",
							items: {
								type: "string",
							},
							description: "Genres associated with the movie",
						},
					},
				},
				Genre: {
					type: "object",
					properties: {
						name: {
							type: "string",
							description: "Name of the genre",
						},
					},
				},
			},
		},
	},
	apis: [
		"./src/app.ts",
		"./dist/app.js",
		"./src/routes/movieRoutes.ts",
		"./src/routes/genreRoutes.ts",
		"./dist/routes/movieRoutes.js",
		"./dist/routes/genreRoutes.js",
	],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

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

app.use("/movies", movieRoutes);
app.use("/genres", genreRoutes);
app.use(function (request, response, next) {
	response.status(404).send("Not found");
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
