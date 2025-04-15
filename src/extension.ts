import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("collapseAllCode.foldAll", () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const { document } = editor;
      const totalLines = document.lineCount;

      for (let line = 0; line < totalLines; line++) {
        // const range = new vscode.Range(line, 0, line, 0);
        vscode.commands.executeCommand("editor.fold", { selectionLines: [line] });
      }
    })
  );
}
