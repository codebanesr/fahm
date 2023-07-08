const messagesEl = document.getElementById('messages') as HTMLElement;
const messageInput = document.getElementById(
  'messageInput',
) as HTMLInputElement;
const sendButton = document.getElementById('sendButton') as HTMLElement;

// Default theme
let theme: 'light' | 'dark' = 'light';

// Load previous messages from API
async function getMessages() {
  const response = await fetch('https://myapi/messages');
  const messages: { text: string; isUser: boolean }[] = await response.json();
  messages.forEach((message) => {
    messagesEl.innerHTML += buildMessage(message);
  });
}

function buildMessage(message: { text: string; isUser: boolean }) {
  const { text, isUser } = message;
  let messageClass = isUser ? 'sent' : 'received';
  if (theme === 'dark') messageClass += ' dark';
  return `<div class="message ${messageClass}">${text}</div>`;
}

function toggleTheme() {
  console.log(theme);
  if (theme === 'light') {
    theme = 'dark';
    messagesEl.classList.add('dark');
  } else {
    theme = 'light';
    messagesEl.classList.remove('dark');
  }
}

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  fetch('https://myapi/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: message }),
  });
  messageInput.value = '';
});

getMessages();
