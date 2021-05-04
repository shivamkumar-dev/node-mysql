const pool = require('../../config/database');

module.exports = {
  // Create User
  createUser: (data, callBack) => {
    pool.query(
      `INSERT INTO users(name, gender, email, password, phone) VALUES(?, ?, ?, ?, ?)`,
      [data.name, data.gender, data.email, data.password, data.phone],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results);
      }
    );
  },
  // Get All Users
  getUsers: callBack => {
    pool.query(
      `SELECT name, gender, email, phone FROM users`,
      [],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results);
      }
    );
  },
  // Get user
  getUserByUserId: (id, callBack) => {
    pool.query(
      `SELECT name, gender, email, phone FROM users WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );
  },
  // Update a user
  updateUser: (id, data, callBack) => {
    pool.query(
      `UPDATE users SET name = ?, gender = ?, email = ?, password = ? phone = ? WHERE id = ?`,
      [data.name, data.gender, data.email, data.password, data.phone, id],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );
  },
  // Delete user
  deleteUser: (id, callBack) => {
    pool.query(
      `DELETE FROM users WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );
  },
  // Email Login
  getUserByEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );
  }
};
