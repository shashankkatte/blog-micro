const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//  Since this is a simple project to demo microservices, we will use in memory as datastore.
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  // Generate random comment Id
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // Check if the post id from request already exists in our comments object / data store. If not found just get an emoty array
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Comments service listening on port 4001');
});
