const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all events
router.get('/', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM event');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (conn) conn.end();
  }
});

// GET one event by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM event WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (conn) conn.end();
  }
});

// POST new event
router.post('/', async (req, res) => {
  const { title, date, location, image_url } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO event (title, date, location, image_url) VALUES (?, ?, ?, ?)',
      [title, date, location, image_url],
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Insert failed' });
  } finally {
    if (conn) conn.end();
  }
});

// PUT update event
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, date, location, image_url } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      'UPDATE event SET title=?, date=?, location=?, image_url=? WHERE id=?',
      [title, date, location, image_url, id],
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  } finally {
    if (conn) conn.end();
  }
});

// DELETE event
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query('DELETE FROM event WHERE id=?', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
