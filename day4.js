// Create a function resolvePath(relativePath) that takes a relative path as input and resolves it to an absolute path using the path module.
// The function should print the resolved path to the console.

const path = require('node:path');

function resolvePath(relativePath){
    console.log(`Resolved path for ${relativePath} is`);
    console.log(path.resolve(relativePath));
}


resolvePath('testfiles/textfile.txt');
resolvePath('nonexistent-folder/file.txt');