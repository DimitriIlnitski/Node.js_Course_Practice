const express = require("express");
const app = express();
const port = 3000;

app.get("/health-check", (req, res) => {
	res.send(`App server is running on port ${port}`);
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
