// formatting.js

const formatCodeBlocks = (text) => {
    const codeBlockRegex = /```([\s\S]*?)```/g;
    return text.replace(codeBlockRegex, (match, code) => {
        const formattedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<pre><code>${formattedCode}</code></pre>`;
    });
};
