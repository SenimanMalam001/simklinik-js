const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  index: (req,res) => {
    models.User.all().then(user => {
      res.status(200).json({
        message: 'Success Retrieve All Users',
        data: user
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  create: (req, res) => {
    const { username, password, name} = req.body
    const hashPassword = bcrypt.hashSync(password, 10);
    models.User.create({
      username,
      password: hashPassword,
      name
    }).then((user) => {
      res.status(201).json({
        message: 'Success Create User',
        data: user
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })

  },
  update: (req, res) => {
    const { id } = req.params
    const { username, password, name} = req.body
    const hashPassword = bcrypt.hashSync(password, 10);
    models.User.findOne({
      where: { id: id}
    }).then((user) => {
      if (user) {
        user.update({
          username,
          password: hashPassword,
          name
        }).then((updatedUser) => {
          res.status(200).json({
            message: 'Success Update User',
            data: user
          })
        }).catch((err) => {
          res.status(500).json({
            message: 'Something Went Wrong',
          })
        })
      } else {
        res.status(404).json({
          message: 'User Not Found',
        })
      }
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
  destroy: (req, res) => {
    const { id } = req.params
    models.User.findOne({
      where: {
        id: id
      }
    }).then((user) => {
      user.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete User',
          data: user
        })
      }).catch((err) => {
        res.status(500).json({
          message: 'Something Went Wrong',
        })
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
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
