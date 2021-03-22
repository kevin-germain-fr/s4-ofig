require('dotenv').config();

const express = require('express');
const router = require('./app/router');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static('integration'));

app.set('view engine', 'ejs');
app.set('views', './app/views');

const session = require('express-session');

app.use(session({
  secret: process.env.SECRET_SESSION,
  resave:true,
  saveUninitialized:true
}));

app.use((request, response, next) => {
  if(!request.session.bookmarks) request.session.bookmarks = [];
  next();
})

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
