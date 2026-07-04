const pool = require('../config/db');

const TodoModel = {
  create: async (userId, title, description) => {
    const query = `
      INSERT INTO todos (user_id, title, description)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [userId, title, description];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  findAllByUser: async (userId) => {
    const query = `
      SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC;
    `;
    const values = [userId];
    const result = await pool.query(query, values);
    return result.rows;
  },

  findById: async (id) => {
    const query = `
      SELECT * FROM todos WHERE id = $1;
    `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  update: async (id, userId, title, description) => {
    const query = `
      UPDATE todos
      SET title = $1, description = $2
      WHERE id = $3 AND user_id = $4
      RETURNING *;
    `;
    const values = [title, description, id, userId];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  deleteById: async (id, userId) => {
    const query = `
      DELETE FROM todos WHERE id = $1 AND user_id = $2
      RETURNING *;
    `;
    const values = [id, userId];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  deleteAllByUser: async (userId) => {
    const query = `
      DELETE FROM todos WHERE user_id = $1
      RETURNING *;
    `;
    const values = [userId];
    const result = await pool.query(query, values);
    return result.rows;
  },
};

module.exports = TodoModel;
