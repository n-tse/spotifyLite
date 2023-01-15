const app = require('./server');
const connection = require("./config/db");

// Make sure the database is connected before starting the server
const port = process.env.PORT || 3001; // we can access variables we store in .env using process.env.{name of property}.
connection.once('open', () => {
  app.listen(port, () => {
    console.log(`Server is up and running on: http://localhost:${port}`);
  });
});
