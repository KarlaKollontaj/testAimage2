const express = require("express");
const mysql = require("mysql2");
const dotenv = require('dotenv');
const cors = require("cors");
const { body, validationResult } = require("express-validator");


dotenv.config({ path: './.env'})

const app = express();
app.use(express.json());
app.use(cors());

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
});

app.post("/submit", [
  body("nome").isString(),
  body("cognome").isString(),
  body("telefono").isMobilePhone(),
  body("email").isEmail(),
  body("corsoInteresse").isIn(["react", "vuejs", "nodejs", "mongodb"]),
], (req, res) => {
  const { nome, cognome, telefono, email, corsoInteresse } = req.body;
  
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const duplicateQuery = "SELECT * FROM tabellaAimage WHERE email = ? AND telefono = ?";
  db.query(duplicateQuery, [email, telefono], (err, results) => {
    if (err) {
      console.error("Errore nella verifica dei duplicati:", err);
      res.status(500).json({ message: "Errore nella verifica dei duplicati" });
    } else {
      if (results.length > 0) {
        const updateQuery = "UPDATE tabellaAimage SET nome = ?, cognome = ?, corsoInteresse = ? WHERE email = ? AND telefono = ?";
        db.query(updateQuery, [telefono, email, corsoInteresse, nome, cognome], (error, result) => {
          if (error) {
            console.error("Errore nell'aggiornamento del record:", error);
            res.status(500).json({ message: "Errore nell'aggiornamento del record" });
          } else {
            console.log("Dati aggiornati con successo");
            res.status(200).json({ message: "Aggiornamento avvenuto con successo" });
          }
        });
      } else {
        const insertQuery = "INSERT INTO tabellaAimage (nome, cognome, telefono, email, corsoInteresse) VALUES (?, ?, ?, ?, ?)";
        db.query(insertQuery, [nome, cognome, telefono, email, corsoInteresse], (error, result) => {
          if (error) {
            console.error("Errore nell'inserimento dei dati:", error);
            res.status(500).json({ message: "Errore nell'inserimento dei dati" });
          } else {
            console.log("Dati inseriti con successo");
            res.status(200).json({ message: "Registrazione avvenuta con successo" });
          }
        });
      }
    }
  });
});

app.listen(5000, () => {
    console.log("Server started on Port 5000")
})