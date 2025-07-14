const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { event_id, user_id, quantity, seat_number } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      'INSERT INTO ticket (id_event, id_user, quantity, seat_number, purchased_at) VALUES (?, ?, ?, ?, NOW())',
      [event_id, user_id, quantity, seat_number],
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
