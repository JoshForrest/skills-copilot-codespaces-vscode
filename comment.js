// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Create router
const router = express.Router();

// Router middleware
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

// Define the home page route
router.get('/', (req, res) => {
    res.send('Home page');
})

// Define the about page route
router.get('/about', (req, res) => {
    res.send('About page');
})

// Define the user page route
router.get('/user/:id', (req, res) => {
    res.send('User page: ' + req.params.id);
})

// Apply router to app
app.use('/', router);

// Listen to port
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})