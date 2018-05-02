
const fs = require("fs");
const path = require("path");
const uuid = require("node-uuid");
const exec = require("child_process").exec;

try {
    // Get current file's directory
    let target_dir = path.dirname("C:\\Users\\jwinsley\\Documents\\GitHub\\vsc-interactive-screenshot\\interactive-screenshots")
    // Generate unique filename
    let unique_file = "screenshot_" + uuid.v4() + ".png"
    // Hide VSC
    // Launch Minicap to capture screenshot and save
    exec(`MiniCap.exe -captureregselect -exit -escapequit -save \"${path.join(target_dir, unique_file)}\"`, (err, stdout, stderr) => {
        // Refocus VSC
        if (err) {
            console.error(err);
            return
        }
    })
    // Display a message box to the user
    //vscode.window.showInformationMessage('Launched MiniCap!');
    
}
catch (e) {
    console.error(e)
}