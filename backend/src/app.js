const express = require('express')
const routes = require('./routes/index')
const cors = require('cors');
const app = express()


const allowedOrigins = [
  "http://localhost:3000",        
  `${process.env.FRONTEND_URL}`,
];
app.use(
  cors({
    origin: (origin, callback) => {
      
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());
app.use('/', routes)

module.exports = app;