"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_js_1 = __importDefault(require("./swagger.js"));
const app = (0, express_1.default)();
const port = 3000;
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_js_1.default));
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
