// Create a function checkFileExtension(filePath, expectedExtension) that takes a file path and an expected file extension as input.
// The function should check if the file has the expected extension using the path module
// and print the result to the console.

const path = require('node:path');

function checkFileExtension(filePath, expectedExtension){
    const fileExtension = path.extname(filePath);

    if (fileExtension === expectedExtension)
    console.log(`File has the expected extension: ${expectedExtension}`);
    else
    console.log(`File does not have the expected extension. Expected: ${expectedExtension}, Actual: ${fileExtension}`);
}

checkFileExtension('testfiles/textfile.txt', '.txt');
checkFileExtension('testfiles/1.png', '.jpg');