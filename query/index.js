const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/posts', (req, res) => {});
app.post('/events', (req, res) => {});

app.listen(4002, () => {
  console.log('Query Service listening on port 4002');
});
