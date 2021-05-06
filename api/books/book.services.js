const pool = require('../../config/database');

module.exports = {
  // Create Book
  createBook: (data, callBack) => {
    pool.query(
      `INSERT INTO books(name, author, copies_sold) VALUES(?, ?, ?)`,
      [data.name, data.author, data.copies_sold],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results);
      }
    );
  },
  // Get All Books
  getBooks: callBack => {
    pool.query(
      `SELECT name, author, copies_sold FROM books`,
      [],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results);
      }
    );
  },
  // Get Book
  getBookByBookId: (id, callBack) => {
    pool.query(
      `SELECT name, author, copies_sold FROM books WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );
  },
  // Update Book
  updateBook: (id, data, callBack) => {
    pool.query(
      `UPDATE books SET name = ?, author = ?, copies_sold = ? WHERE id = ?`,
      [data.name, data.author, data.copies_sold],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );
  },
  // Delete Book
  deleteBook: (id, callBack) => {
    pool.query(
      `DELETE FROM books WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );
  }
};
