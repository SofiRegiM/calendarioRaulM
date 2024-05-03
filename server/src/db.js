const { Pool } = require('pg');
const pool = new Pool({
  user: 'yourUsername',
  host: 'localhost',
  database: 'yourDatabaseName',
  password: 'yourPassword',
  port: 5432,
});
async function saveTokens(userId, tokens) {
    const { access_token, refresh_token, scope, token_type, expiry_date } = tokens;
    const query = `
      INSERT INTO user_tokens(user_id, access_token, refresh_token, scope, token_type, expiry_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (user_id) DO UPDATE
      SET access_token = EXCLUDED.access_token,
          refresh_token = EXCLUDED.refresh_token,
          scope = EXCLUDED.scope,
          token_type = EXCLUDED.token_type,
          expiry_date = EXCLUDED.expiry_date;
    `;
    await pool.query(query, [userId, access_token, refresh_token, scope, token_type, new Date(expiry_date)]);
  }
  async function getTokens(userId) {
    const query = `SELECT * FROM user_tokens WHERE user_id = $1;`;
    const result = await pool.query(query, [userId]);
    return result.rows[0]; // Assuming there's only one row per user
  }

module.exports = pool;
