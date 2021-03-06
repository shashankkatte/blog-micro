const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

//  Since this is a simple project to demo microservices, we will use in memory as datastore.
const posts = {};
 
// Get all posts ever created
app.get('/posts', (req, res) => {
  res.send(posts);
});

//  create a new post { id, title }
app.post('/posts', async (req, res) => {
  // Just some random id generation
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  // construct and store post object in our in-memory data store
  posts[id] = {
    id,
    title,
  };

  // fire an event that post is created
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post('/events',(req,res) => {
  console.log('Received event', req.body.type);
  res.send({});
})

app.listen(4000, () => {
  console.log('Posts service listening on port 4000');
});
