//Create a function executeCommand(command) that takes a shell command as input and executes it using the child_process module.
// The function should print the output of the command to the console.
const {exec} = require('child_process');
const { error } = require('console');

function executeCommand(command){
    exec(command, (error, stdout, stderr)=>{
        if(error){
            console.log(`error: ${error}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })
}

executeCommand('wsl ls -la');

executeCommand('echo "Hello, Node.js!"');