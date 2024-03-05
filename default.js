// api
window.onmessage = function (e) {
    var content = e.data
    if (content.slice(0, 4) == 'file') {
        window.actvalue = content.slice(5,e.data.length)
        require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs' } });
        require(['vs/editor/editor.main'], function () {
            monaco.editor.setTheme(
                'dark'
            )
            var editor = monaco.editor.create(document.getElementById('container'), {
                value: window.actvalue,
                language: 'repviewer',
                fontSize: "20px",
                automaticLayout: true,
                theme: 'vs-dark'
            });
            editor.onDidChangeModelContent(function (e) {
                e = monaco.editor.getEditors()[0].getValue()
                window.top.postMessage('u' + e, '*')
            });
        });

    }
};

window.parent.postMessage('file', '*')