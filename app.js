const express = require("express");
const app = express();
const routerAuth = require("./auth/authRouter");
const router = require("./templates/routers");
const serverPort = 3000;

app.set("view engine", "pug");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use("/", router);
app.use("/auth", routerAuth);

app.listen(serverPort, () => console.log(`serwer work on port: ${serverPort}`));