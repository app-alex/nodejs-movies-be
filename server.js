const mysql = require("mysql2");
const express = require("express");

const app = express();
app.use(express.json());

const port = 3000;

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "122333",
  database: "movies_db",
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    app.get("/", (req, res) => {
      con.query(
        // "CREATE TABLE movies (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description VARCHAR(255) , status ENUM('TO WATCH', 'WATCHING', 'WATCHED'))",

        "SELECT * FROM movies",
        function (err, result) {
          if (err) throw err;
          console.log("Result: " + result);

          Object.keys(result).forEach(function (key) {
            var row = result[key];
            console.log(row.name, row.description, row.status);
          });

          res.send(result);
        }
      );
    });

    app.post("/", (req, res) => {
      const { name, description } = req.body;
      con.query(
        `INSERT INTO movies (name, description, status) VALUES ('${name}', '${description}', 'TO WATCH')`
      );

      res.send("Success");
    });

    app.patch("/:id", (req, res) => {
      const id = req.params.id;
      const { name, description } = req.body;
      con.query(
        `UPDATE movies
        SET name = '${name}', description = '${description}' 
        WHERE id=${id}`
      );

      res.send("Success");
    });

    app.patch("/status/:id", (req, res) => {
      const id = req.params.id;
      const { status } = req.body;
      con.query(
        `UPDATE movies
        SET status = '${status}' 
        WHERE id=${id}`
      );

      res.send("Success");
    });

    app.delete("/:id", (req, res) => {
      const id = req.params.id;
      console.log(id);

      con.query(`DELETE FROM movies WHERE id=${id}`);

      res.send("Deleted movie with id " + id);
    });
  });
});
