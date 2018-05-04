const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');
const otoritas = require('./routes/otoritas');
const kategoritransaksi = require('./routes/kategoritransaksi');
const kategoriproduk = require('./routes/kategoriproduk');
const poli = require('./routes/poli');
const satuan = require('./routes/satuan');
const ruangan = require('./routes/ruangan');
const kas = require('./routes/kas');
const penjamin = require('./routes/penjamin');
const supplier = require('./routes/supplier');

const app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/otoritas', otoritas);
app.use('/kategori-transaksi', kategoritransaksi);
app.use('/kategori-produk', kategoriproduk);
app.use('/poli', poli);
app.use('/satuan', satuan);
app.use('/ruangan', ruangan);
app.use('/kas', kas);
app.use('/penjamin', penjamin);
app.use('/supplier', supplier);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({message: err.message})
});

module.exports = app;
