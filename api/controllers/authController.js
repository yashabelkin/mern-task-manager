const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const passport = require('passport');

exports.signup = catchAsync (async (req, res, next) => {
    newUser =  await User.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            user:newUser
        }
    });
});

exports.login = catchAsync (async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(400).json({
          message: info.message
        });
      }
      req.login(user, err => {
        if (err) {
          return next(err);
        }
        return res.json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      });
    })(req, res, next);
  });

  
  