const pool = require('../config/db');

const UserModel = {
  create: async (username, email, hashedPassword) => {
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at;
    `;
    const values = [username, email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const query = `
      SELECT * FROM users WHERE email = $1;
    `;
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  findById: async (id) => {
    const query = `
      SELECT id, username, email, created_at FROM users WHERE id = $1;
    `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },
};

module.exports = UserModel;
