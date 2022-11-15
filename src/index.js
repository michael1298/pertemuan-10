const config = require('./core/config');
const app = require('./core/server');

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log(`server runs at port ${config.port}`);
  }
});
