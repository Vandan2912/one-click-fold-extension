import * as vscode from "vscode";

let isCollapsed = false; // Toggle state between collapsed/expanded

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("collapseAllCode.foldAll", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const document = editor.document;
      const totalLines = document.lineCount;

      let insideReturnBlock = false;
      let returnBlockDepth = 0;

      for (let line = 0; line < totalLines; line++) {
        const lineText = document.lineAt(line).text.trim();

        // Detect start of a return JSX block
        if (lineText.startsWith("return (") || lineText.startsWith("return(")) {
          insideReturnBlock = true;
          returnBlockDepth = 1;
          continue; // Skip this line from folding/unfolding
        }

        if (insideReturnBlock) {
          // Count parentheses depth to determine end of return block
          for (const char of lineText) {
            if (char === "(") {
              returnBlockDepth++;
            }
            if (char === ")") {
              returnBlockDepth--;
            }
          }

          if (returnBlockDepth <= 0) {
            insideReturnBlock = false;
          }

          continue; // Skip folding/unfolding while inside return block
        }

        // Now fold or unfold based on the toggle state
        const command = isCollapsed ? "editor.unfold" : "editor.fold";
        await vscode.commands.executeCommand(command, { selectionLines: [line] });
      }

      isCollapsed = !isCollapsed; // Flip toggle state
    })
  );
}
