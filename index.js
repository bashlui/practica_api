import express from "express";
import routes from "./routes/routes.js";


const app = express();

app.use(routes);

const port = 5000;

app.listen(port, console.log("http://localhost:" + port));