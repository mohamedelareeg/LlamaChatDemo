// api.js

const askGpt = async (message) => {
    try {
        messageInput.value = '';
        window.scrollTo(0, 0);
        window.controller = new AbortController();

        promptLock = true;
        window.text = '';
        window.token = messageId();

        stopGenerating.classList.remove('stop_generating-hidden');

        addUserMessage(message);
        await new Promise((r) => setTimeout(r, 500));

        addGptMessageContainer();

        const response = await fetch('http://localhost:11434/api/chat', {
            method: 'POST',
            signal: window.controller.signal,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama3.1:8b',
                messages: [
                    { role: 'user', content: message }
                ],
                stream: true
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let partialText = '';

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim() !== '');
            for (const line of lines) {
                try {
                    const data = JSON.parse(line);

                    if (data.message && data.message.role === 'assistant') {
                        partialText += data.message.content;
                        updateGptMessage(partialText);
                    }

                    if (data.done) {
                        addMessage(window.conversation_id, 'assistant', partialText);
                        messageBox.scrollTop = messageBox.scrollHeight;
                        await removeCancelButton();
                        promptLock = false;
                    }
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
            }
        }
    } catch (e) {
        handleError(e, message);
    }
};

const removeCancelButton = async () => {
    stopGenerating.classList.add('stop_generating-hiding');

    setTimeout(() => {
        stopGenerating.classList.remove('stop_generating-hiding');
        stopGenerating.classList.add('stop_generating-hidden');
    }, 300);
};

const handleError = (e, message) => {
    console.error(e);
    if (window.controller.signal.aborted) {
        addGptMessageContainer();
        updateGptMessage("Cancelled");

        addMessage(window.conversation_id, 'user', message);
        addMessage(window.conversation_id, 'assistant', 'Cancelled');

        removeCancelButton();
        promptLock = false;
    } else {
        addGptMessageContainer();
        updateGptMessage(`An error occurred: ${e.message}`);

        addMessage(window.conversation_id, 'user', message);
        addMessage(window.conversation_id, 'assistant', `An error occurred: ${e.message}`);

        removeCancelButton();
        promptLock = false;
    }
};
