const dbLink = require('./../config').db_link;

const db = require('mongodb');
const MongoClient = db.MongoClient;
let _db;

const mongoConnect = (cb) => {
    MongoClient.connect(dbLink).then(
        client => {
            _db = client.db();
            console.log('Connected to the Database');
            cb();
        }
    ).catch(
        error => {
            throw error;
        }
    )
}

const getDb = () => {
    if(_db) {
        return _db;
    } 

    throw 'Database connection not established';
}

module.exports = {
    mongoConnect,
    getDb
}