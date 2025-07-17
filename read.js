const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'data.txt');

fs.readFile(file, 'utf8', (err, data) =>{
    if (err) throw err;
    console.log('File contents:\n', data);
});