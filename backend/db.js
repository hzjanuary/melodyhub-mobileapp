// backend/db.js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',      // địa chỉ máy chủ MariaDB
  user: 'root',           // username
  password: 'admin123',           // password
  database: 'concert_management',  // tên database của bạn
  connectionLimit: 5
});

module.exports = pool;
