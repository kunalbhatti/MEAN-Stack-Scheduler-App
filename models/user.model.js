const getDb = require('./../util/database.util').getDb;

class User {
    constructor(name, email, password, role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    register() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    // can find user using id or email etc
    static findUser(option) {
        const db = getDb();
        return db.collection('users').findOne(option);
    }

    static update(option, data) {
        const db = getDb();
        return db.collection('users').updateOne(
            option, {
                $set: data
            }, {
                upsert: true
            }
        );
    }

}

module.exports = User;