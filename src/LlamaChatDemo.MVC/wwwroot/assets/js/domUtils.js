// domUtils.js

const messageBox = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const boxConversations = document.querySelector('.top');
const stopGenerating = document.querySelector('.stop_generating');
const sendButton = document.querySelector('#send-button');
const jailbreak = document.getElementById('jailbreak');
const model = document.getElementById('model');
let promptLock = false;

const resizeTextarea = (textarea) => {
    textarea.style.height = '80px';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
};

const addMessage = (conversationId, role, content) => {
    const conversation = JSON.parse(localStorage.getItem(`conversation:${conversationId}`));
    conversation.items.push({ role, content });
    localStorage.setItem(`conversation:${conversationId}`, JSON.stringify(conversation));
};

const addUserMessage = (message) => {
    messageBox.innerHTML += `
    <div class="message">
        <div class="user">
            ${user_image}
            <i class="fa-regular fa-phone-arrow-up-right"></i>
        </div>
        <div class="content" id="user_${window.token}">${format(message)}</div>
    </div>
  `;
};

const addGptMessageContainer = () => {
    messageBox.innerHTML += `
    <div class="message">
        <div class="user">
            ${gpt_image}
            <i class="fa-brands fa-usps"></i>
        </div>
        <div class="content" id="message_${window.token}"></div>
    </div>
  `;
};

const updateGptMessage = (text) => {
    const formattedText = formatCodeBlocks(text);
    document.getElementById(`message_${window.token}`).innerHTML = formattedText;
};

const addConversationToBox = (conversation) => {
    boxConversations.innerHTML += `
    <div class="box" id="convo-${conversation.id}">
        <a class="left" onclick="setConversation('${conversation.id}')">
            <div class="box_title">${conversation.title}</div>
            <div class="box_subtitle">${new Date().toISOString().split('T')[0]}</div>
        </a>
        <div class="right" id="conv-${conversation.id}">
            <button class="btn" onclick="showOption('${conversation.id}')">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
        <div class="right conv-option conv-option-hidden" id="yes-${conversation.id}">
            <button class="btn" onclick="deleteConversation('${conversation.id}')">Yes</button>
        </div>
        <div class="right conv-option conv-option-hidden" id="not-${conversation.id}">
            <button class="btn" onclick="hideOption('${conversation.id}')">No</button>
        </div>
    </div>
  `;
};

const showOption = (conversationId) => {
    document.getElementById(`conv-${conversationId}`).style.display = 'none';
    document.getElementById(`yes-${conversationId}`).style.display = 'block';
    document.getElementById(`not-${conversationId}`).style.display = 'block';
};

const hideOption = (conversationId) => {
    document.getElementById(`conv-${conversationId}`).style.display = 'block';
    document.getElementById(`yes-${conversationId}`).style.display = 'none';
    document.getElementById(`not-${conversationId}`).style.display = 'none';
};
