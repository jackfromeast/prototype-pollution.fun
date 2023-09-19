const express = require('express');
const bodyParser = require('body-parser');
const CoffeeScript = require('coffeescript');
const helper = require('underscore-keypath')
const jwt = require('jsonwebtoken');
const adminVisit = require('./admin-bot')


const path = require('path');
const { resourceUsage } = require('process');
const PORT = 8399;

const app = express();

const SECRET_KEY = "THIS_IS_A_SECRET_KEY"; 
var log = {}

/**
 * Create a hardcopy of the original prototype
 */
const ORIGIN_PROTOTYPE = Object.create(null);
Object.getOwnPropertyNames(Object.prototype).forEach((prop) => {
    const descriptor = Object.getOwnPropertyDescriptor(Object.prototype, prop);
    Object.defineProperty(ORIGIN_PROTOTYPE, prop, descriptor);
});

app.use(bodyParser.json());
app.use(express.static('public')); 

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(403).json({ error: 'No token provided' });
    }
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'login.html'))    
});

app.post('/login', (req, res) => {
    // For simplicity, let's have a mock login
    const { username, password } = req.body;

    const user = {
        username: username,
        password: password
    };

    // logging
    helper.setValueForKeyPath(log, username, password)

    jwt.sign({ user }, SECRET_KEY, { expiresIn: '12h' }, (err, token) => {
        if (err) {
            res.sendStatus(403);
        }
        // console.log(token)
        res.json({ token });
    });
});


app.post('/coffee-compiler', verifyToken, (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err, authData) => {
        if (err) {
            res.status(403).json({ error: 'Token verification failed' });
            return;
        }

        // Make sure you receive code in the body
        if (!req.body.code) {
            res.status(400).json({ error: 'No code provided in the request body' });
            return;
        }

        try {
            let code = req.body.code;
            if(code==="# Functions:\nsquare = (x) -> x * x"){
                // I am pretty confident that the default code is safe
                // It won't cause any reflected XSS, isn't?
                const compiledCode = CoffeeScript.compile(req.body.code);
                res.json({ compiledCode });
            }else{
                res.status(500).json({ error: 'Try using the defualt coffee script code again!' });
            }
        } catch (e) {
            res.status(500).json({ error: 'Compilation failed' });
        }
    });
});

app.get('/coffee', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'compiler.html'))    
});

app.get('/admin', (req, res) => {
    adminVisit();
    res.send('Admin will take a look sooon!');
})

/**
 * Reset the Prototype
 * In case you mess up the prototype :/
 */
app.get('/reset', (req, res) => {
    Object.getOwnPropertyNames(Object.prototype).forEach((prop) => {
        if(prop in ORIGIN_PROTOTYPE === false){
            delete Object.prototype[prop]
        }
    });
    res.send('Prototype has been reset :>')
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
