const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const MongoStore = require('connect-mongo');
const tasks = require('./routes/taskRoutes');
const lists = require('./routes/listRoutes');
const users = require('./routes/userRoutes');

const app = express();

require('dotenv').config();

const cors = require('cors');

connectDB();


// middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    
}

app.use(express.json());

// added for the react connection
app.use(cors());


// Passport middleware
app.use(passport.initialize());

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
}));

// Passport config
require('./config/passport')(passport);
 
// new one

// routes

app.use('/api/v1/lists', lists)

app.use('/api/v1/tasks', tasks)

app.use('/api/v1', users)




app.all('*', (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server...`, 404));
});

app.use(globalErrorHandler)


const port = process.env.PORT || 8000;
app.listen(port,() => {
    console.log(`App running on port ${port}...`)
} )



