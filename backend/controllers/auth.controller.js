const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // file kết nối MariaDB (sử dụng pool thay vì db trực tiếp nếu db.js trả về pool)

const register = async (req, res) => {
  const { username, password, email, phone } = req.body;

  let conn; // Khai báo biến kết nối
  try {
    conn = await pool.getConnection(); // Lấy kết nối từ pool

    // Kiểm tra username hoặc email đã tồn tại chưa
    let checkRows;
    try {
      const [rows] = await conn.execute(
        // Sử dụng conn.execute
        'SELECT * FROM user WHERE username = ? OR email = ?',
        [username, email],
      );
      checkRows = rows;
      console.log('Kết quả kiểm tra tồn tại (rows):', checkRows); // Log kết quả
    } catch (dbErr) {
      console.error('Lỗi CSDL khi kiểm tra tồn tại:', dbErr);
      return res.status(500).json({ message: 'Lỗi CSDL khi kiểm tra tồn tại' });
    }

    if (checkRows.length > 0) {
      // Sử dụng checkRows
      return res
        .status(400)
        .json({ message: 'Username hoặc Email đã tồn tại' });
    }

    const hash = await bcrypt.hash(password, 10);

    // Thêm người dùng mới
    try {
      const [insertResult] = await conn.execute(
        // Sử dụng conn.execute
        `INSERT INTO user (username, password, email, phone, role, created_at)
           VALUES (?, ?, ?, ?, 'user', NOW())`,
        [username, hash, email, phone],
      );
      console.log('Insert user thành công:', insertResult); // Log kết quả insert
    } catch (dbErr) {
      console.error('Lỗi CSDL khi insert user:', dbErr);
      return res.status(500).json({ message: 'Lỗi CSDL khi thêm người dùng' });
    }

    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (err) {
    console.error('Lỗi chung trong register (kết nối):', err); // Bắt lỗi khi lấy kết nối
    res.status(500).json({ message: 'Lỗi máy chủ không xác định' });
  } finally {
    if (conn) conn.release(); // Giải phóng kết nối
  }
};

const login = (req, res) => {
  const { username, password } = req.body;
  // Sử dụng pool và callback cho db.query (giống cách bạn đã viết)
  pool.query(
    // Sử dụng pool.query
    'SELECT * FROM user WHERE username = ?', // Sửa lại tên bảng nếu cần
    [username],
    async (err, results) => {
      if (err) {
        // Bắt lỗi query
        console.error('Lỗi CSDL khi tìm user login:', err);
        return res.status(500).json({ message: 'Lỗi CSDL khi tìm user' });
      }
      if (results.length === 0) {
        console.log('Không tìm thấy user login');
        return res.status(400).json({ message: 'Sai username' });
      }

      const user = results[0];
      // ... phần còn lại của login ...
      // Nhớ thêm log cho bcrypt.compare và jwt.sign nếu cần debug login
    },
  );
};

exports.register = register;
exports.login = login;
