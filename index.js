const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`Server is running -- PORT[${port}]`);
});

routerApi(app);

app.listen(port, () => {
  console.log(`Server is running -- PORT[${port}]`);
});
