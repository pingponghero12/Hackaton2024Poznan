// getPaperById.js

const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'skibidi',
  database: 'test_db'
});

function getPaperById(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM papers WHERE id = ?';

    db.query(sql, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}

module.exports = getPaperById;