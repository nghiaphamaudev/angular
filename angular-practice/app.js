const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const productRouter = require('./src/routes/productRouter');
const categoryRouter = require('./src/routes/categoryRouter');
const userRouter = require('./src/routes/userRouter');
const handleGlobalError = require('./src/controllers/errorController');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

//Khi bạn phát triển các ứng dụng web, có thể bạn sẽ gặp trường hợp cần truy cập API từ một tên miền khác (ví dụ: từ localhost:3000 đến localhost:4000). Trình duyệt mặc định sẽ chặn các yêu cầu như vậy vì lý do bảo mật.

app.use(
  cors({
    origin: '*',
  })
);

app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/users', userRouter);

app.use(handleGlobalError);

module.exports = app;
