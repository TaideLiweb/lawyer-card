const express = require('express');
const engine = require('ejs-locals');

const app = express();

app.engine('ejs', engine); // 設定ejs為樣版引擎
app.set('views', './views'); // 設定讀取的資料夾為根目錄的views資料夾
app.set('view engine', 'ejs');

//導入css資料夾裡的東西
app.use('/css', express.static('css'));

//導入靜態檔案資料夾
app.use(express.static('public'));

// 首頁
app.get('/', function (req, res) {
  res.render('index', {
    lawyerSide: false,
    clientSide: true,
    conCall: false,
  });
});
// 律師端首頁
const lawyer = express.Router();

lawyer.get('/', (req, res) => {
  res.render('index', {
    lawyerSide: true,
    clientSide: false,
    conCall: false,
  });
});
app.use('/lawyer', lawyer);

// 視訊頁
app.get('/con-call', (req, res) => {
  res.render('con-call', {
    lawyerSide: false,
    clientSide: false,
    conCall: true,
  });
});

// 律卡部落

const lawyerCardBlog = express.Router();

lawyerCardBlog.get('/', (req, res) => {
  res.render('lawyerCardBlog/index', {
    lawyerSide: false,
    clientSide: false,
    conCall: false,
  });
});
lawyerCardBlog.get('/brand-board', (req, res) => {
  res.render('lawyerCardBlog/brand-board', {
    lawyerSide: false,
    clientSide: false,
    conCall: false,
  });
});
lawyerCardBlog.get('/new-post', (req, res) => {
  res.render('lawyerCardBlog/new-post', {
    lawyerSide: false,
    clientSide: false,
    conCall: false,
  });
});
lawyerCardBlog.get('/lawer-board', (req, res) => {
  res.render('lawyerCardBlog/lawer-board', {
    lawyerSide: false,
    clientSide: false,
    conCall: false,
  });
});
lawyerCardBlog.get('/law-knowledge', (req, res) => {
  res.render('lawyerCardBlog/law-knowledge', {
    lawyerSide: false,
    clientSide: false,
    conCall: false,
  });
});
lawyerCardBlog.get('/hot-topic', (req, res) => {
  res.render('lawyerCardBlog/hot-topic', {
    lawyerSide: false,
    clientSide: false,
    conCall: false,
  });
});
lawyerCardBlog.get('/post', (req, res) => {
  res.render('lawyerCardBlog/post', {
    lawyerSide: false,
    clientSide: false,
    conCall: false,
  });
});
app.use('/lawyerCardBlog', lawyerCardBlog);

const PORT = 3000;
app.listen(PORT, () => console.log(`server is now listening on port ${PORT}`));
