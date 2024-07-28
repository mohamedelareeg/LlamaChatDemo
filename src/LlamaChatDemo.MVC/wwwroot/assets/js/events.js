// events.js

messageInput.addEventListener("blur", () => {
    window.scrollTo(0, 0);
});

messageInput.addEventListener("focus", () => {
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
});

messageInput.addEventListener(`keydown`, async (evt) => {
    if (promptLock) return;
    if (evt.keyCode === 13 && !evt.shiftKey) {
        evt.preventDefault();
        await handleAsk();
    } else {
        messageInput.style.removeProperty("height");
        messageInput.style.height = messageInput.scrollHeight + 4 + "px";
    }
});

sendButton.addEventListener(`click`, async () => {
    if (promptLock) return;
    await handleAsk();
});

const handleAsk = async () => {
    messageInput.style.height = '80px';
    messageInput.focus();

    window.scrollTo(0, 0);
    let message = messageInput.value;

    if (message.length > 0) {
        messageInput.value = '';
        await askGpt(message);
    }
};

document.getElementById('cancelButton').addEventListener('click', () => {
    window.controller.abort();
    console.log(`aborted ${window.conversation_id}`);
});
