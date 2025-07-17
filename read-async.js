const fs = require('fs').promises;
const path = require('path');

async function main(){
    try {
        const file = path.join(__dirname, 'data.txt');
        const data = await fs.readFile(file, 'utf8');
        console.log('Async/await contents:\n', data);
    }
    catch (err){
        console.error('Error:', err);
    }
}

main();