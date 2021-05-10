
const db = require('./databaseConfig');
const jwt = require('jsonwebtoken');
const config = require('../config');

const userDB = {
    // Get user by userid
    getUser: (userid, callback) => {
        // get a connection
        let conn = db.getConnection();

        conn.connect((err) => {
            if (err) { // connection fail
                // invoke and return callback with error and result null
                console.log("Connection failed!");
                return callback(err, null);
            } else {
                console.log("Connected!");
                // form sql statment to select user with given id
                let sql = 'SELECT * from user WHERE userid=?';
                // exe query
                conn.query(sql, [userid], (err, result) => {
                    conn.end(); // close connection
                    if (err) { // query err
                        // invoke and return callback will error and result null
                        console.log("Query Failed");
                        return callback(err, null);
                    } else {
                        console.log("Query Successful!");
                        // invoke and return callback with error null and result record 
                        return callback(null, result);
                    }
                });
            }
        });
    }
    ,
    
    // Add a user
    addUser: (username, email, role, password, callback) => {
        let conn = db.getConnection();
        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected!");
                var sql = 'Insert into user(username,email,role,password) values(?,?,?,?)';
                conn.query(sql, [username, email, role, password], (err, result) => {
                    conn.end();
                    if (err) {
                        console.log("Error Inserting Record!!");
                        //console.log(err);
                        err.statusCode = 409;
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, { id: result.insertId, affectedRows: result.affectedRows });
                        // console.log(result.affectedRows);
                        // return callback(null, result.affectedRows);
                    }
                });
            }
        });
    }
    ,

    // Log in a user
    loginUser: function (email, password, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected!");
                var sql = 'SELECT * FROM user WHERE email=? and password=?';
                conn.query(sql, [email, password], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        //error, token, result
                        return callback(err, null, null);
                    } else {
                        // var msg = "{\"result\":\"" + result.length + "\"}";
                        // return callback(null, msg);
                        var token = "";
                        if (result.length == 1) {
                            let payload = { id: result[0].userid, role: result[0].role };
                            token = jwt.sign(payload, config, {
                                expiresIn: 86400 //expires in 24 hrs
                            });
                            return callback(null, token, result);
                        } else { // no match
                            let errObj = new Error("Userid password does not match.");
                            errObj.statusCode(500);
                            return callback(errObj, null, null);
                        }
                    }
                });
            }
        });
    }

};

module.exports = userDB;