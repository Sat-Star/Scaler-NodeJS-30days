//Create a function writeToFile(filePath, content) that takes the path to a file and user input content as input. The function should write the content to the specified file using the fs module.

const fs = require('node:fs');

function writeToFile(filepath, content){
    fs.writeFile(filepath, content, err =>{
        if(err){
            console.log("File cannot be written", err);
        }
        else{
            console.log(`Data Written to ${filepath}`);
        }
    });
}

writeToFile('testfiles/textfile.txt', 'Sample content. ');
writeToFile('test-files/nonexistent-folder/output.txt', 'Content in non-existing file');