const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/public'));

var AQMAP;

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }

/** 
 * merge (target, source)
 * 
 * foreach property of source
 * if property exists and is an object on both the target and the source merge(target[property], source[property]) else target[property] = source[property]
 * 
 * @param {*} target 
 * @param {*} source 
 * @returns 
 */
function deepMerge(target, source) {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        for (let key in source){
            if(source.hasOwnProperty(key)){
                if(isObject(source[key])){
                    deepMerge(target[key], source[key])
                }else{
                    target[key] = source[key]
                }
            }
        }
    }
    return output;
}

/**
 * Render the Map
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});

/**
 * Fetch the AQ Map
 */
app.get('/data', (req, res) => {
    if(!AQMAP){
        fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading the file:", err);
                res.status(500).send("Error retrieving data");
                return;
            }
            AQMAP = JSON.parse(data);
            res.json(AQMAP);
        });
    }else{
        res.json(AQMAP);
    }
});

/**
 * add new data points to the Map from the client side
 */
app.post('/add', (req, res) => {
    deepMerge(AQMAP, req.body);
    res.send('Added!')
})

/**
 * Get the flag
 */
app.get('/flag', (req, res) => {
    if(Object.prototype.flag === 'polluted'){
        res.send('flag{n0w_y0u_kn0w_h0w_po11ution_w0rks}')
    }else{
        res.send('Nice Try!')
    }
})

const PORT = process.env.PORT || 8399;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});
