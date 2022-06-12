const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/errorHandler');

const app = express();
const port = 3000;

app.use(express.json());

const whiteList = ['http://localhost:3000', 'http://example.com'];

const options = {
  origin: (origin, cb) => {
    if (whiteList.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('Unavalible'));
    }
  },
};

app.use(cors(options));

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running -- PORT[${port}]`);
});
