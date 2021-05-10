
var db = require('./databaseConfig.js');

var categoryDB = {
    //Get all categories
    getCategory: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                var sql = 'SELECT * FROM category';
                conn.query(sql, function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }                    
                });
            }
        });
    }
    ,
    // Get category by catid
    getCatByCatId: (catid, callback) => {
        // get a connection
        let conn = db.getConnection();

        conn.connect((err) => {
            if (err) { // connection fail
                // invoke and return callback with error and result null
                console.log("Connection failed!");
                return callback(err, null);
            } else {
                console.log("Connected!");
                // form sql statement to select game with given gameid
                let sql = 'SELECT * from category WHERE catid=?';
                // exe query
                conn.query(sql, [catid], (err, result) => {
                    conn.end(); // close connection
                    if (err) { // query err
                        // invoke and return callback with error and result null
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
    // Add a new category
    addCategory: (catname, description, callback) => {
        const dbConnect = db.getConnection();
        dbConnect.connect((err) => {
            if (err) {
                console.log('Connection Error');
                return callback(err, null);
            }
            else {
                let sql = "INSERT INTO category (catname, description) VALUES (?,?)";
                dbConnect.query(sql, [catname, description], (err, result) => {
                    if (err) {
                        console.log('Query Error!');
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        console.log('Query Successful!!');
                        return callback(null, result);
                    }
                })
            }
        })
    }

};

module.exports = categoryDB
