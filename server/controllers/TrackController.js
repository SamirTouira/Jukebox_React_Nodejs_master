const mysql = require("mysql");


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database_music'
  });
  connection.connect((err) => {
    if (err) throw err;
});


exports.getTracks = async (req, res) => {
    connection.query("SELECT * FROM tracks LEFT JOIN artists on tracks.id = artists.id LIMIT 10", (error, results, fields) => {
        if (error) throw error;
        // console.log(results);
        return res.status(200).json(results);
    })
}
