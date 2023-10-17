const express = require("express");
const mysql = require("mysql");

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pswmysql23",
    database: "testAimage"
});

db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySql connected...")
    }
})

app.get("/", (req, res)=> {
    res.send("<h1>Home Page<h1>")
});

app.listen(5000, () => {
    console.log("Server started on Port 5000")
})