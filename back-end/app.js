const routers = require("./routers/index.js")
const express = require('express')
var bodyParser = require('body-parser');
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routers(app);



app.listen(3001, () => {
    console.log("Connected to port 3001")
})


module.exports = app;
