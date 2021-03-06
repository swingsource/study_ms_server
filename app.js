var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const morgan = require('morgan')
const logger = require('./logger')

const expressJwt = require('express-jwt')


const multer = require('multer')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/user')
const booksRouter = require('./routes/book')
const teachesRouter = require('./routes/teach')
const chaptersRouter = require('./routes/chapter')
const contentsRouter = require('./routes/content')
const commentsRouter = require('./routes/comment')
const resourcesRouter = require('./routes/resource')

var app = express();

// 白名单
const whitelist = require('./config/whitelist.config')

//配置express的静态目录
app.use(express.static(path.join(__dirname, 'public')))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置diskStorage来控制文件存储的位置以及文件名字等
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname)
  }
})

const upload = multer({ storage: storage })

// const upload = multer({ dest: 'upload' })//当前目录下建立文件夹uploads

//接收上传图片请求的接口
app.post('/api/upload', upload.single('file'), (req, res) => {
  //图片已经被放入到服务器里,且req也已经被upload中间件给处理好了（加上了file等信息）

  //线上的也就是服务器中的图片的绝对地址
  let url = `http://localhost:3000/api/upload/${req.file.filename}`
  res.json({
    code : 200,
    data : url,
    msg: '图片上传成功'
  })
})

// 静态文件托管
app.use('/api/upload', express.static(__dirname + '/upload'))

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(expressJwt({
  secret: 'study_ms_moon',  // 签名的密钥 或 PublicKey
  algorithms: ['HS256']
}).unless({
  path: whitelist  // 指定路径不经过 Token 解析
}))

app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/book', booksRouter);
app.use('/api/teach', teachesRouter);
app.use('/api/chapter', chaptersRouter);
app.use('/api/content', contentsRouter);
app.use('/api/comment', commentsRouter);
app.use('/api/resource', resourcesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 使用自定义的错误处理模块
// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

/**
 * error handler
 * @private
 */
// 处理非404的错误（throw 出来的错误)
const _errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} ` + err.message)
  const errorMsg = err.message
  res.status(err.status || 500).json({
    code: -1,
    success: false,
    message: errorMsg,
    data: {}
  })
}
app.use(_errorHandler)

module.exports = app;
