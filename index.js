const express = require('express');
const engine = require('ejs-locals');

// 先在這定義 router 之後搬移出去
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    lawyerSide: true,
    conCall: false,
  });
});

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
    conCall: false,
  });
});
// 律師端首頁
app.use('/lawyer', router);

// 測試頁
app.get('/con-call', (req, res) => {
  res.render('con-call', {
    lawyerSide: false,
    conCall: true,
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`server is now listening on port ${PORT}`));
