
var db=require('./databaseConfig.js');

var gameDB = {
    
    // Get game by gameid
    getGameById: (gameid, callback) => {
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
                let sql = 'SELECT * from game WHERE gameid=?';
                // exe query
                conn.query(sql, [gameid], (err, result) => {
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
    // Get all games
    getAllGames: (callback) => {
        let conn = db.getConnection();

        conn.connect((err) => {
            if (err) { // connection fail
                // invoke and return callback with error and result null
                console.log("Connection failed!");
                return callback(err, null);
            } else {
                console.log("Connected!");
                // form sql statement to select all games
                let sql = 'SELECT * from game';
                // exe query
                conn.query(sql, (err, result) => {
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
    },

     // Add a new game
     addGame: (title, description, price, platform, catid, year, callback) => {
        const dbConnect = db.getConnection();
        dbConnect.connect((err) => {
            if (err) {
                console.log('Connection Error');
                return callback(err, null);
            }
            else {
                let sql = "INSERT INTO game (title, description, price, platform, catid, year) VALUES (?, ?, ?, ?, ?, ?)";
                dbConnect.query(sql, [title, description, price, platform, catid, year], (err, result) => {
                    if (err) {
                        console.log('Query Error!');
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        console.log('Query Successful!!');
                        let sql2 = "SELECT gameid FROM game WHERE title = ?";
                        dbConnect.query(sql2, [title], (err, result) => {
                            dbConnect.end();
                            if (err) {
                                console.log('Query Error!');
                                return callback(err, null);
                            }
                            else {
                                console.log('Query Successful!');
                                return callback(null, result);
                            }
                        });
                    }
                })
            }
        })
    },


    //Get reviews by gameid
    getReview: (gameid, callback) => {
        const dbConnect = db.getConnection();
        dbConnect.connect((err) => {
            if (err) {
                console.log('Connection Error!');
                return callback(err, null);
            }
            else {
                let sql = "SELECT review.gameid, review.content, review.rating, user.username, review.created_at FROM sp_games.review, sp_games.user WHERE gameid = ? AND review.userid = user.userid";
                dbConnect.query(sql, [gameid], (err, result) => {
                    dbConnect.end();
                    if (err) {
                        console.log('Query Error!');
                        return callback(err, null);
                    }
                    else {
                        console.log('Query Successful!');
                        return callback(null, result);
                    }
                })
            }
        })
    },

    //Add a review for a particular game
    addReview: (content, rating, gameid, userid, callback) => {
        const dbConnect = db.getConnection();
        dbConnect.connect((err) => {
            if (err) {
                console.log('Connection Error');
                return callback(err, null);
            }
            else {
                let sql = 'INSERT INTO review (content, rating, gameid, userid) VALUES (?, ?, ?, ?) ';
                dbConnect.query(sql, [content, rating, gameid, userid], (err, result) => {
                    if (err) {
                        console.log('Query Error');
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        console.log('Query Successful!');
                        return callback(null, result);
                    }
                })
            }
        })
    }
};

module.exports = gameDB
