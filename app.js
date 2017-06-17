const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const clientSessions = require("client-sessions");
// const methodOverride = require('method-override');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(methodOverride('_method'));

app.use(clientSessions({
  secret: 'supersecretsecretstring'
}));

app.get('/', function (req, res){
  if (req.session_state.username) {
    res.send('Welcome ' + req.session_state.username + '! (<a href="/logout">logout</a>)');
  } else {
    res.send('You need to <a href="/login">login</a>.');
  }
});

app.get('/login', function (req, res){
  req.session_state.username = 'JohnDoe';
  console.log(req.session_state.username + ' logged in.');
  res.redirect('/');
});

app.get('/logout', function (req, res) {
  req.session_state.reset();
  res.redirect('/');
});

app.listen(3000);
