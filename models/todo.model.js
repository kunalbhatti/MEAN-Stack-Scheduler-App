const getDb = require('./../util/database.util').getDb;
const ObjectId = require('mongodb').ObjectId;

class Todo {
    constructor(task, date, time, uid) {
        this.task = task;
        this.date = date;
        this.time = time;
        this.uid = uid;
    }

    createItem() {
        const db = getDb();
        return db.collection('tasks').insertOne(this);
    }

    static updateItem(uid, id, data) {
        const db = getDb();
        return db.collection('tasks').updateOne({_id: new ObjectId(id), uid}, {$set: {task: data.task, date: data.date, time: data.time}});
    }

    static deleteItem(uid, id) {
        const db = getDb();
        return db.collection('tasks').deleteOne({_id: new ObjectId(id), uid});
    }

    static getItem(uid, day, month, year, getDailyData) {
        const db = getDb();
        let searchFilter = {    
            'date.month': month,
            'date.year': year, 
            uid
        }

        if(getDailyData) {
            searchFilter['date.day']= day;
        }

        return db.collection('tasks').find(searchFilter).toArray();
    }
}

module.exports = Todo;