const app = require('./controller/app');

const hostname = 'localhost';
const port = 8081;

let server = app.listen(port, hostname, ()=> {
    console.log(`Web App Hosted at http://${hostname}:${port}`);
});