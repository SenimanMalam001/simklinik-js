const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  signin: (req,res) => {
    const { username, password} = req.body
    models.User.findOne({
      where: {
        username: username
      }
    }).then(user => {
      if (user) {
        const checkPassword = bcrypt.compareSync(password, user.password); // true
        if (checkPassword) {
          const token = jwt.sign({ user:{
            id: user.id,
            username: user.username
          } }, 'secret');
          res.status(200).json({
            message: 'Success Signin',
            data: { token }
          })
        } else {
          res.status(403).json({
            message: 'Invalid Signin',
          })
        }
      } else {
          res.status(403).json({
            message: 'Invalid Signin',
          })
      }
    })
  }
};
