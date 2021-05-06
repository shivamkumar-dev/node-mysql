const { verify } = require('jsonwebtoken');

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get('Authorization');
    if (token) {
      token = token.slice(7);
      verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.status(500).json({
            success: 0,
            message: 'Invalid Token'
          });
        }
        next();
      });
    } else {
      res.status(500).json({
        success: 0,
        message: 'Access denied! unauthorized User'
      });
    }
  }
};
