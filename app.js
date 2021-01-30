const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;



const mongoConnect = require('./util/database.util').mongoConnect;
const authController = require('./controllers/auth.controller');
const todoController = require('./controllers/todo.controller');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

const forceSSL = function() {
    return function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(
         ['https://', req.get('Host'), req.url].join('')
        );
      }
      next();
    }
  }
  // Instruct the app
  // to use the forceSSL
  // middleware
  app.use(forceSSL());

app.use('/auth', authController);
app.use('/app', todoController);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

mongoConnect(() => {
    app.listen(port, () => {
        console.log('Server is up and running');
    })
})