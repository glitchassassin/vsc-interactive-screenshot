// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const short = require("short-uuid");
const exec = require("child_process").exec;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "interactive-screenshots" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.screenshot', function () {
        // The code you place here will be executed every time your command is executed
        try {
            // Get current file's directory
            let target_dir = path.dirname(vscode.window.activeTextEditor.document.fileName)
            // Generate unique filename
            let unique_file = "screenshot_" + short.uuid() + ".png"
            // Hide VSC
            // Launch Minicap to capture screenshot and save
            exec(`${__dirname}\\MiniCap.exe -captureregselect -exit -escapequit -save \"${path.join(target_dir, unique_file)}\"`, (err, stdout, stderr) => {
                // Refocus VSC
                if (err) {
                    vscode.window.showErrorMessage(err.message);
                    return
                }
                let screenshot = "screenshot_adea3f86-6ea1-40f5-ad77-d983cd740c62.png"
                // Insert screenshot filename to current selection/cursor
                if (!vscode.window.activeTextEditor.selection.isEmpty) {
                    for (let selection of vscode.window.activeTextEditor.selections) {
                        vscode.window.activeTextEditor.edit((editBuilder)=>{
                            editBuilder.replace(selection, unique_file)
                        })
                    }
                }
                else {
                    vscode.window.activeTextEditor.edit((editBuilder)=>{
                        editBuilder.insert(vscode.window.activeTextEditor.selection.active, unique_file)
                    })
                }
                vscode.window.showInformationMessage('Screenshot captured!');
            })
            // Display a message box to the user
            //vscode.window.showInformationMessage('Launched MiniCap!');
            
        }
        catch (e) {
            console.error(e)
        }
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;