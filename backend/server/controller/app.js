
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
const util = require('util');
const cors = require('cors');

const app = express();
const user = require('../model/user');
const category = require('../model/category.js');
const game = require('../model/game.js');
const isLoggedInMiddleware = require('../auth/isLoggedInMiddleware');
const isAdminMiddleware = require('../auth/isAdminMiddleware');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`requesting: ${req.url}`);
    console.log(`method: ${req.method}`);
    console.log(`path: ${req.path}`);
    console.log('Body Object');
    console.log(util.inspect(req.body, { depth: null }));
    next();
});

app.use(serveStatic(path.join(__dirname, '../../public')));

//Get a user by userid
app.get('/api/user/:userid', (req, res) => {
    let id = req.params.userid;
    user.getUser(id, (err, result) => {
        if (!err) { // no error
            res.status(200);
            res.type('application/json');
            res.json(result);
        } else { // error 
            res.status(500).send("Server Error");
        }
    });
});



//Add a user
app.post('/api/user', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let role = "public";
    let password = req.body.password;

    user.addUser(username, email, role, password, (err, result) => {
        if (!err) {
            console.log(result);
            res.status(200);
            res.type('application/json');
            res.json(result);
        } else {
            res.sendStatus(err.statusCode);
        }
    });
})


//Get all categories
app.get('/api/category', function (req, res) {
    category.getCategory(function (err, result) {
        if (!err) {
            res.status(200).type('application/json').json(result);
        } else {
            console.log(err);
            res.status(500).send("Some error");
        }
    });
});

//Get category by catid
app.get('/api/category/:catid', (req, res) => {
    let catid = req.params.catid;
    category.getCatByCatId(catid, (err, result) => {
        if (!err) { // no error
            res.status(200);
            res.type('application/json');
            res.json(result);
        } else { // error 
            res.status(500).send("Server Error");
        }
    });
});

//Add a new category
app.post("/category", isLoggedInMiddleware, (req, res) => {
    let catname = req.body.catname;
    let description = req.body.description;

    category.addCategory(catname, description, (err, result) => {
        if (!err) { // no error
            res.status(200);
            res.type('application/json');
            res.json(result);
        } else { // error 
            res.status(500).send("Server Error");
        }
    })
})


//Get all games
app.get('/api/games', (req, res) => {
    game.getAllGames((err, result) => {
        if (!err) { // no error
            res.status(200);
            res.type('application/json');
            res.json(result);
        } else { // error 
            res.status(500).send("Server Error");
        }
    });
});

//Get a game by gameid
app.get('/api/game/:gameid', (req, res) => {
    let gameid = req.params.gameid;
    game.getGameById(gameid, (err, result) => {
        if (!err) { // no error
            res.status(200);
            res.type('application/json');
            res.json(result);
        } else { // error 
            res.status(500).send("Server Error");
        }
    });
});

//Add a new game
app.post("/game", isAdminMiddleware, (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let price = req.body.price;
    let platform = req.body.platform;
    let catid = req.body.catid;
    let year = req.body.year;

    game.addGame(title, description, price, platform, catid, year, (err, result) => {
        if (err) {
            console.log('Database Error');
            res.status(500).type("application/json").json({ "Result": "Internal Server Error!" });
        }
        else {
            res.status(200).type("application/json").json(result);
        }
    })
})

//Get reviews by gameid
app.get("/game/:id/review", (req, res) => {
    let gameid = req.params.id;

    game.getReview(gameid, (err, result) => {
        if (err) {
            console.log('Database Error');
            res.status(500).type("application/json").json({ "Result": "Internal Server Error!" });

        }
        else {
            res.status(200).type("application/json").json(result);
        }
    })
})

//Add a review for a particular game
app.post("/user/:uid/game/:gid/review/", isLoggedInMiddleware, (req, res) => {
    let content = req.body.content;
    let rating = req.body.rating;
    let gameid = req.params.gid;
    let userid = req.params.uid;

    game.addReview(content, rating, gameid, userid, (err, result) => {
        if (err) {
            console.log('Database Error');
            res.status(500).type("application/json").json({ "Result": "Internal Server Error!" });
        }
        else {
            res.status(201).type("application/json").json(result);
        }
    })
})

//Log in a user
app.post('/api/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    user.loginUser(email, password, function (err, token, result) {
        if (!err) {
            console.log(result);
            delete result[0]['password'];
            console.log(result);

            let loginResult = {
                success: true,
                token: token,
                UserData: result,
                status: 'You are successfully logged in.'
            };
            res.status(200).type('application/json').json(loginResult);
            //res.send("{\"result\":\""+result +"\"}");
        } else {
            res.status(204);
            res.send(err.statusCode);
        }
    });
});



// Catch All
app.use(function (req, res) {
    res.status(404);
    res.type("text/html");
    res.end("<html><body>File Not Found</body></html>");
});

module.exports = app;
