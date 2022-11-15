const express = require('express');
const { celebrate } = require('celebrate');
const userController = require('../controllers/user');

const isAuth = require('../middlewares/isAuth');

const authValidator = require('../validators/auth');

const route = express.Router();

module.exports = (app) => {
  app.use('/auth', route);

  route.get('/', isAuth, async (req, res) => res.json({
    status: 'OK',
    email: req.user.email,
  }).status(200));

  route.post(
    '/register',
    celebrate(authValidator.register),
    async (req, res, next) => {
      try {
        const existingUser = await userController.findByEmail(req.body.email);
        if (existingUser) {
          throw new Error('Email is already registered');
        }
        // todo regoster user( inser to db)
        await userController.create(
          req.body.email,
          req.body.full_name,
          req.body.password,
        );

        res.json({
          status: 'OK',
        }).status(200);
      } catch (error) {
        return next(error);
      }
    },
  );

  route.post(
    '/login',
    celebrate(authValidator.login),
    async (req, res, next) => {
      try {
        const user = await userController.login(req.body.email, req.body.password);
        if (!user) {
          throw new Error('Wrong email or password');
        }

        // generate token

        const token = await userController.generateToken(user.id);
        return res.json({
          email: user.email,
          full_name: user.full_name,
          token,
        });
      } catch (error) {
        return next(error);
      }
    },
  );
};
