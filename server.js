require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router');
const bookRouter = require('./api/books/book.router');

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
