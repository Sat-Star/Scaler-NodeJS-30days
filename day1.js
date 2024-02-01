// Create a function readFileContent(filePath) that takes the path to a file as input and reads its content asynchronously using the fs module. The function should print the content to the console.

const fs = require('node:fs');
const file1 = 'testfiles/textfile.txt';
const file2 = 'testfiles/gitemptyfile.txt';

function readFileContent(filePath){
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log("Not able to read file", err);
            return;
        }
        console.log(data);
    });
}

readFileContent(file1);
readFileContent(file2);
readFileContent('doesntexist.txt');