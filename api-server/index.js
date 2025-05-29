const express = require("express");
const bodyParser = require("body-parser");

const http = require("http-client").fetch
const app = express();
app.use(bodyParser.json());
// app.use(function (req, res, next) { setTimeout(next, 1000);});   // use this to add a 1-second delay to all requests

const SERVER_PORT = 8081;

// All those locals is only for demo and should be removed when full feature API will be available
let localPostId = 101;
const localPosts = [];
const localComments = [];

app.get("/api/blog/posts", (req, res) => {
  http('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => {
      let blogPosts = JSON.parse(JSON.stringify(json)).reverse().slice(0, 9);  // by default return 100, so for test purposes limit for pretty UI view
      blogPosts.forEach(blogPost => {
        blogPost['date'] = randomDate(new Date(2025, 0, 1), new Date());
        blogPost['imageUrl'] = `https://picsum.photos/200/300?random=${randomNumber()}`;
      });
      let mergedPosts = [...localPosts, ...blogPosts];
      res.send(mergedPosts);
    });
});

app.get("/api/blog/:id/post", (req, res) => {
  let localPost = localPosts.find(post => post.id === parseInt(req.params.id));
  if (localPost) {res.send(localPost); return;}

  http(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`)
    .then((response) => response.json())
    .then((json) => {
      let blogPost = JSON.parse(JSON.stringify(json));
      blogPost['date'] = randomDate(new Date(2025, 0, 1), new Date());
      blogPost['imageUrl'] = `https://picsum.photos/200/300?random=${randomNumber()}`;
      res.send(blogPost);
    });
});

app.get("/api/blog/post/:id/comments", (req, res) => {
  http(`https://jsonplaceholder.typicode.com/posts/${req.params.id}/comments`)
    .then((response) => response.json())
    .then((json) => {
      let comments = JSON.parse(JSON.stringify(json));
      let localComment = localComments.filter(comment => comment.postId === req.params.id);
      let mergedComments = [...comments, ...localComment]; // Bad, but need to somehow show comments

      mergedComments.forEach(comment => {
        comment['date'] = randomDate(new Date(2025, 0, 1), new Date());
        comment['avatarImageUrl'] = `https://avatar.iran.liara.run/public?random=${randomNumber()}`;
      });
      res.send(mergedComments)
    });
});

app.post("/api/blog/post/comment", (req, res) => {
  http(`https://jsonplaceholder.typicode.com/comments`, {
    method: 'POST',
    body: JSON.stringify({
      postId: req.body.postId,
      body: req.body.body,
      name: req.body.name,
      email: req.body.email,
    }),
    headers: {'Content-type': 'application/json; charset=UTF-8'}})
    .then((response) => response.json())
    .then((json) => localComments.push(json))
    .then((json) => res.send(json))
  });

app.get("/api/blog/post/:userId/author", (req, res) => {
  http(`https://jsonplaceholder.typicode.com/users/${req.params.userId}`)
    .then((response) => response.json())
    .then((json) => {
      json['avatarImageUrl'] = `https://avatar.iran.liara.run/public?random=${randomNumber()}`;
      res.send(json)
    });
});

app.get("/api/blog/post/authors", (req, res) => {
  http(`https://jsonplaceholder.typicode.com/users`)  // all available users
    .then((response) => response.json())
    .then((json) => {
      json['avatarImageUrl'] = `https://avatar.iran.liara.run/public?random=${randomNumber()}`;
      res.send(json)
    });
});

app.post("/api/blog/post", (req, res) => {
  http(`https://jsonplaceholder.typicode.com/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title: req.body.title,
      body: req.body.body,
      userId: req.body.userId,}),
    headers: {'Content-type': 'application/json; charset=UTF-8'}})
    .then((response) => response.json())
    .then((json) => {
      json['id'] = localPostId++;
      json['date'] = formatDate(new Date());  // should be the latest and displayed on top
      json['imageUrl'] = `https://picsum.photos/200/300?random=${randomNumber()}`;
      localPosts.push(json);
    })
    .then((json) => res.send(json))
});

function randomDate(start, end) {
  let isoDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return formatDate(isoDate);
}

function randomNumber() {
  return Math.random().toString().slice(2,11);
}

function formatDate(isoDate) {
  let date = new Date(isoDate).toISOString().slice(0, 10);   // extract date value
  let time = new Date(isoDate).toISOString().slice(11, 16);  // extract time value
  return date + ' ' + time; // Example: 2025-05-10 12:19
}

app.listen(SERVER_PORT, () => console.log(`Blog Post API Server listening on port ${SERVER_PORT}!`));
