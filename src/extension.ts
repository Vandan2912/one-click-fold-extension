import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("collapseAllCode.foldAll", () => {
    vscode.commands.executeCommand("editor.foldAll");
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
