const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const { errors } = require('celebrate');

const routesv1 = require('../api/v1');

const app = express();

app.enable('trust proxy');

app.use(cors());

app.use(passport.initialize());

app.use(require('method-override')());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routesv1());

app.use((err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

app.use(errors());

app.use((err, req, res, next) => {
  if (err.status === 401) {
    return res.status(err.status)
      .send({
        statusCode: 401,
        error: 'unauthorized access',
        message: err.message,
      })
      .end();
  }

  return res.status(err.status || 500)
    .send({
      statusCode: err.status || 500,
      error: 'internal server error',
      message: err.message,
    })
    .end();
});

module.exports = app;
