// api
window.onmessage = function (e) {
    if (e.data.slice(0, 4) == 'file') {
        window.actvalue = e.data.slice(5,e.data.length)
        require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs' } });
        require(['vs/editor/editor.main'], function () {
            monaco.editor.setTheme(
                'dark'
            )
            var editor = monaco.editor.create(document.getElementById('container'), {
                value: window.actvalue,
                language: 'javascript',
                fontSize: "20px",
                theme: 'vs-dark'
            });
            monaco.languages.registerCompletionItemProvider('javascript', {
                provideCompletionItems: (model, position) => {
                    const keywords = [["Novatike", "/* --- Novakite --- */"]]
                    const suggestions = keywords.map(keyword => ({
                        label: keyword[0],
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: keyword[1]
                    }));
                    return { suggestions };
                }
            });
            editor.onDidChangeModelContent(function (e) {
                e = monaco.editor.getEditors()[0].getValue()
                window.parent.postMessage('u' + e, '*')
            });
        });

    }
};

window.parent.postMessage('file', '*')
