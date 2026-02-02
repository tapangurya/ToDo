const express = require('express');
const cors = require('cors'); // <-- import cors
const app = express();
const { mongoConnect } = require('./Utils/dbconnect');
const router = require('./Router/router');
const error = require('./Error/ErrorHandler');

// Enable CORS for your frontend
app.use(
  cors({
    origin: '*', // allow your React frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // allowed HTTP methods
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
