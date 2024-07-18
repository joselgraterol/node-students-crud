//import all the necesary modules
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");  

//create express app
const app = express();

//create pool
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "students",
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM student_details";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post("/api/post", (req, res) => {
    // const name = req.body.name;
    // const email = req.body.email;
    // const age = req.body.age;
    const { name, email, age } = req.body;
    const sqlInsert = "INSERT INTO student_details (name, email, age) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, age], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
});

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM student_details WHERE id = ?";
    db.query(sqlRemove, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//this is for editing the students

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlSelect = "SELECT * FROM student_details WHERE id = ?";
    db.query(sqlSelect, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const sqlUpdate = "UPDATE student_details SET name = ?, email = ?, age = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, age, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});




app.listen(5000, () => {
    console.log("Server started on port 3001");
});