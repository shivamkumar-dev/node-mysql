const {
  createBook,
  getBooks,
  getBookByBookId,
  updateBook,
  deleteBook
} = require('./book.services');

module.exports = {
  // Create Book
  createBook: (req, res) => {
    const body = req.body;

    createBook(body, (err, results) => {
      if (err)
        return res.status(500).json({
          success: 0,
          message: err.sqlMessage
        });

      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  // Get All Books
  getBooks: (req, res) => {
    getBooks((err, results) => {
      if (err)
        return res.status(500).json({
          success: 0,
          message: err.sqlMessage
        });

      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  // Get a single Book
  getBookByBookId: (req, res) => {
    const id = req.params.id;

    getBookByBookId(id, (err, results) => {
      if (err)
        return res.status(500).json({
          success: 0,
          message: err.sqlMessage
        });

      if (!results)
        return res.status(500).json({
          success: 0,
          message: 'Book not found'
        });

      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  // Update Book
  updateBook: (req, res) => {
    const id = req.params.id;
    const body = req.body;

    updateBook(id, body, (err, results) => {
      if (err)
        return res.status(500).json({
          success: 0,
          message: err.sqlMessage
        });

      if (!results)
        return res.status(500).json({
          success: 0,
          message: 'Failed to update Book'
        });

      return res.status(200).json({
        success: 1,
        message: 'Updated successfully'
      });
    });
  },
  // Delete Book
  deleteBook: (req, res) => {
    const id = req.params.id;

    deleteBook(id, (err, results) => {
      if (err)
        return res.status(500).json({
          success: 0,
          message: err.sqlMessage
        });

      if (!result)
        return res.status(500).json({
          success: 0,
          message: 'Book not found'
        });

      return res.status(200).json({
        success: 1,
        message: 'Book deleted successfully'
      });
    });
  }
};
