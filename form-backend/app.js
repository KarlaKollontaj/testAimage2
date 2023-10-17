const express = require("express");
const mysql = require("mysql2");
const dotenv = require('dotenv');
const cors = require("cors");

app.use(cors());

dotenv.config({ path: './.env'})

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySql connected...")
    }
})

app.post("/submit", (req, res) => {
    const { nome, cognome, telefono, email, corsoInteresse } = req.body;
  
    // Esegui una query SQL per inserire i dati nel database
    const query = "INSERT INTO tabellaAimage (nome, cognome, telefono, email, corsoInteresse) VALUES (?, ?, ?, ?, ?)";
  
    db.query(query, [nome, cognome, telefono, email, corsoInteresse], (error, results) => {
      if (error) {
        console.error("Errore nell'inserimento dei dati:", error);
        res.status(500).json({ message: "Errore nell'inserimento dei dati" });
      } else {
        console.log("Dati inseriti con successo");
        res.status(200).json({ message: "Registrazione avvenuta con successo" });
      }
    });
  });
  

app.get("/", (req, res)=> {
    res.send("<h1>Home Page<h1>")
});

app.listen(5000, () => {
    console.log("Server started on Port 5000")
})