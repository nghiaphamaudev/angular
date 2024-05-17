const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const productRouter = require('./src/routes/productRouter');
const handleGlobalError = require('./src/controllers/errorController');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Khi bạn phát triển các ứng dụng web, có thể bạn sẽ gặp trường hợp cần truy cập API từ một tên miền khác (ví dụ: từ localhost:3000 đến localhost:4000). Trình duyệt mặc định sẽ chặn các yêu cầu như vậy vì lý do bảo mật.

app.use(cors());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './src/views'));

app.use('/api/v1/products', productRouter);

app.use(handleGlobalError);

module.exports = app;
