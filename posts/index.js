const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//  Since this is a simple project to demo microservices, we will use in memory as datastore.
const posts = {};

// Get all posts ever created
app.get('/posts', (req, res) => {
  res.send(posts);
});

//  create a new post { id, title }
app.post('/posts', (req, res) => {
  // Just some random id generation
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  // construct and store post object in our in-memory data store
  posts[id] = {
    id,
    title,
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('Posts service listening on port 4000');
});
