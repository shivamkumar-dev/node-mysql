const router = require('express').Router();
const {
  createBook,
  getBooks,
  getBookByBookId,
  updateBook,
  deleteBook
} = require('./book.controller');

const { checkToken } = require('../../auth/token_validation');

router.route('/').post(checkToken, createBook).get(getBooks);

router
  .route('/:id')
  .get(getBookByBookId)
  .patch(checkToken, updateBook)
  .delete(checkToken, deleteBook);

module.exports = router;
