const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "mysql-newgen-keman885-newgen.f.aivencloud.com", // Provided by Aiven
  port: 13676, // Default MySQL port on Aiven
  user: "user", // Default Aiven MySQL username
  password: "AVNS_VYhIwIX70s2x4kFnqEX", // Provided by Aiven
  database: "defaultdb", // Default Aiven MySQL database
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected as id " + connection.threadId);
});

app.get("/api/data", (req, res) => {
  connection.query("SELECT * FROM items", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

const PORT = 13676 || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
