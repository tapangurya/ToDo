const express = require('express');
const cors = require('cors');
var app = express();
const { mongoConnect } = require('./Utils/dbconnect');
const router = require('./Router/router');
const error = require('./Error/ErrorHandler');

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  }),
);
app.use(express.json());
app.use(router);
app.use(error);

const PORT = 3000;
(async () => {
  try {
    await mongoConnect(); // wait for DB connection
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
})();
