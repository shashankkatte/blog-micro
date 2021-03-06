const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

//  Since this is a simple project to demo microservices, we will use in memory as datastore.
const commentsByPostId = {};

// Get all the comments associated with given post id from request or return empty
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  // Generate random comment Id
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // Check if the post id from request already exists in our comments data store. If not found just get an empty array
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  // Fire an event on comment creation
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
});

app.post('/events',(req,res) => {
  console.log('Received event', req.body.type);
  res.send({});
})

app.listen(4001, () => {
  console.log('Comments service listening on port 4001');
});
