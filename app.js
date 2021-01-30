const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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