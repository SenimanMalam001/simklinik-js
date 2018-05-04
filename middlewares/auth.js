const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models');

module.exports = {

  auth: (req,res,next) => {
    try {
      const decoded = jwt.verify(req.headers.token, 'secret');
      if(decoded){
        next();
      } else {
        res.status(500).json({
          message: "Invalid Token"
        });
      }

    } catch(err) {
        res.status(500).json({
          message: "Invalid Token"
        });
    }
  },
}
