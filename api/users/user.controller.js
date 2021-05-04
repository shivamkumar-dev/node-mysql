const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const {
  createUser,
  getUsers,
  getUserByUserId,
  updateUser,
  deleteUser,
  getUserByEmail
} = require('./user.service');

module.exports = {
  // Create User
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    createUser(body, (err, results) => {
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
  // Get All Users
  getUsers: (req, res) => {
    getUsers((err, results) => {
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
  // Get a single user
  getUserByUserId: (req, res) => {
    const id = req.params.id;

    getUserByUserId(id, (err, results) => {
      if (err)
        return res.status(500).json({
          success: 0,
          message: err.sqlMessage
        });

      if (!results)
        return res.status(500).json({
          success: 0,
          message: 'User not found'
        });

      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  // Update a user
  updateUser: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    updateUser(id, body, (err, results) => {
      if (err)
        return res.status(500).json({
          success: 0,
          message: err.sqlMessage
        });

      if (!results)
        return res.status(500).json({
          success: 0,
          message: 'Failed to update user'
        });

      return res.status(200).json({
        success: 1,
        message: 'Updated successfully'
      });
    });
  },
  // Delete a user
  deleteUser: (req, res) => {
    const id = req.params.id;

    deleteUser(id, (err, results) => {
      if (err)
        return res.status(500).json({
          success: 0,
          message: err.sqlMessage
        });

      if (!result)
        return res.status(500).json({
          success: 0,
          message: 'User not found'
        });

      return res.status(200).json({
        success: 1,
        message: 'User deleted successfully'
      });
    });
  },
  // User Login
  getUserByEmail: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (err, results) => {
      if (err)
        return res.status(500).json({
          success: 0,
          message: err.sqlMessage
        });

      if (!results)
        return res.status(500).json({
          success: 0,
          message: 'Invalid email or password'
        });

      const result = compareSync(body.password, results.password);

      if (result) {
        results.password = undefined;
        const token = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: '1hr'
        });

        res.status(200).json({
          success: 1,
          message: 'Login Successful',
          token
        });
      } else {
        return res.status(500).json({
          success: 0,
          message: 'Invalid email or password'
        });
      }
    });
  }
};
