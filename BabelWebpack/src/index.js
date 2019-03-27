const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const router = require("./routes");

app.use("/", router);

app.listen(port, () => console.log("Server running at port:", port));
