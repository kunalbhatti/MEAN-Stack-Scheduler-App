const express = require('express');
const router = express.Router();
const Todo = require('./../models/todo.model');

const validateToken = require('./../middlewares/validateToken.middleare').validateToken;

router.post('/get-post', validateToken, (req, res) => {
    Todo.getItem(req.uid, req.body.day, req.body.month, req.body.year, req.body.daily).then(
        items => {
            res.status(200).send(items);
        }
    ).catch(err => {
        console.log(err);
        res.status(400).send('Operation Failed');
    });;
});


router.post('/add-post', validateToken, (req, res) => {
    const todo = new Todo(
        req.body.task,
        req.body.date,
        req.body.time,
        req.uid
    );

    todo.createItem().then(
        item => {
            return res.status(200).send(todo)
        }
    ).catch(err => {
        console.log(err);
        res.status(400).send('Operation Failed');
    });
})

router.patch('/update-post/:id', validateToken, (req, res) => {
    Todo.updateItem(req.uid,req.params.id, req.body).then(
        result => {
            res.status(200).send({
                updated: true,
                body: req.body
            });
        }
    ).catch(err => {
        console.log(err);
        res.status(400).send('Operation Failed');
    })
})

router.delete('/delete-post/:id', validateToken, (req, res) => {
    Todo.deleteItem(req.uid, req.params.id).then(
        result => {
            res.send({
                deleted: true
            });
        }
    ).catch(err => {
        console.log(err);
        res.status(400).send('Operation Failed');
    });
})

module.exports = router;