import express from "express";
import routes from "./routes/routes.js";
import user from "./routes/user.routes.js";
import { pool } from "./db/db.js";
import "dotenv/config";

// console.log(process.env.HOST);

const app = express();

app.use(express.json());

app.use(routes);
app.use(user);


const port = 5000;

app.listen(port, console.log("http://localhost:" + port));