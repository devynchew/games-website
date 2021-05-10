

const mysql = require('mysql');

const dbconnect = {
    getConnection: () => {
        let conn = mysql.createConnection({
            host: "localhost",
            user: "BEDUser",
            password: "password123",
            database: "sp_games"
        });
        return conn;
    }
}

module.exports = dbconnect;