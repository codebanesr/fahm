export function ChatComponent(messagesApi, uploadApi, theme) {
    const messagesEl = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    // Load previous messages from API
    async function getMessages() {
        const response = await fetch(messagesApi);
        const messages = await response.json();
        messages.forEach(message => {
            messagesEl.innerHTML += buildMessage(message);
        });
    }

    function buildMessage(message) {
        const { text, isUser } = message;
        let messageClass = isUser ? 'sent' : 'received';
        if (theme === 'dark') messageClass += ' dark';
        return `<div class="message ${messageClass}">${text}</div>`;
    }

    function toggleTheme() {
        if (theme === 'light') {
            theme = 'dark';
            messagesEl.classList.add('dark');
            document.body.classList.add('dark');
        } else {
            theme = 'light';
            messagesEl.classList.remove('dark');
            document.body.classList.remove('dark');
        }
    }

    sendButton.addEventListener('click', () => {
        const message = messageInput.value;
        fetch(uploadApi, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: message })
        });
        messageInput.value = '';
    });

    getMessages();
}