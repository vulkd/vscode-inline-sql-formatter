// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as sqlFormatter from 'sql-formatter';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "inline-sql-formatter" is now active!');
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('inline-sql-formatter.sqlInlineFormat', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
		// @ts-ignore
		let cursorPosition = editor.selection.start;
		// @ts-ignore
		let cursorPositione = editor.selection.end;
		// @ts-ignore

		var wordRange = new vscode.Range(cursorPosition, cursorPositione);

		// let wordRange = editor.document.getWordRangeAtPosition(cursorPosition, cursorPositione);
		// @ts-ignore

		let highlight = editor.document.getText(wordRange);

		let textFormatted = sqlFormatter.format(highlight, {
			uppercase: true,
			language: "sql", // Defaults to "sql"
			indent: "	"   // Defaults to two spaces
		});
		// @ts-ignore
		editor.edit(function (editBuilder) {
			// @ts-ignore
			editBuilder.replace(wordRange, textFormatted);
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}