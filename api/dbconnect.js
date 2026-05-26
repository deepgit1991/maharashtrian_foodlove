require("dotenv").config();
const mysql = require("mysql2");

const isOnline = process.env.NODE_ENV === "online";

let db;

if (isOnline) {
  // ONLINE (Railway)
  db = mysql.createConnection(process.env.MYSQL_PUBLIC_URL);
} else {
  // LOCAL
  db = mysql.createConnection({
    host: process.env.LOCAL_DB_HOST,
    user: process.env.LOCAL_DB_USER,
    password: process.env.LOCAL_DB_PASSWORD,
    database: process.env.LOCAL_DB_NAME,
    port: 3306,
  });
}

db.connect((err) => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("Database Connected");
  }
});

module.exports = db;