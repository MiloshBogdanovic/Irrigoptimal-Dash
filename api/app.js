var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
const session = require('express-session');
var cors  = require('cors');
var passport	= require('passport');
var passportMiddleware = require('./middleware/passport');
const {sequelize} =  require('./sequelize');
var upload = multer();
var config = require('./config/config');
var app = express();



// view engine setup
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var specialRouter = require('./routes/special');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(upload.array());
app.use(express.static(path.join(__dirname, 'public')));
//
app.use(passport.initialize());


sequelize.authenticate().then(() => {

  console.log('Connection has been established successfully.');
  
  }).catch(err => {
  
  console.error('Unable to connect to the database:', err);
  
  });
//


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/special', specialRouter);
// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});


app.use(session({
  secret: config.jwtSeacret, /// it should be place in env var, it is a key for encripitin inforamtion about thte sesion
  resave: false, // should we resave varioable if notihing is chenged
  saveUninitialized: false, /// do u want to change if there is no value in the session
}))


passport.use(passportMiddleware);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({err:err.message});
});


app.listen(4000, () => {
  console.log('Server listening on port 4000');
});

module.exports = app;
