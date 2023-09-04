let mysql = require("mysql2");

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "122333",
  database: "movies_db",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  con.query(
    // "CREATE TABLE movies (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description VARCHAR(255), length_minutes INT, release_year YEAR, status ENUM('TO WATCH', 'WATCHING', 'WATCHED'))",
    // "INSERT INTO movies (name, description, length_minutes, release_year, status) VALUES ('IT', 'Scary movie about a clown', 135, 2017, 'WATCHED')",
    "SELECT * FROM movies",
    function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);

      Object.keys(result).forEach(function (key) {
        var row = result[key];
        console.log(
          row.name,
          row.description,
          row.length_minutes,
          row.release_year,
          row.status
        );
      });
    }
  );
});
