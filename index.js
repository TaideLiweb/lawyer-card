const express = require('express');
let engine = require('ejs-locals');

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
  res.render('index');
});
// 首頁
app.get('/user', function (req, res) {
  res.render('user');
});

// 測試頁
app.get('/test', (req, res) => {
  res.json({ ok: true });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`server is now listening on port ${PORT}`));
