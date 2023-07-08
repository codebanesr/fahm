# Chat App Component

This is a reusable chat app component that provides a UI similar to popular messaging apps like WhatsApp or Telegram. It allows users to send messages and display a chat history.

## Installation

To use the `chat-app` component in your Angular, React, or Vue project, follow the steps below.

### Angular

1. Install the `chat-app` package via npm:

```bash
npm install chat-app
```

2. In your Angular module, import the `chat-app` module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChatAppComponent } from 'chat-app';

@NgModule({
  declarations: [ChatAppComponent],
  imports: [BrowserModule],
  bootstrap: [ChatAppComponent]
})
export class AppModule {}
```

3. Use the `chat-app` component in your Angular template:

```html
<chat-app endpoint="https://api.example.com/messages"></chat-app>
```

Replace `"https://api.example.com/messages"` with the actual endpoint URL to call when sending messages.

### React

1. Install the `chat-app` package via npm:

```bash
npm install chat-app
```

2. Import and use the `chat-app` component in your React component:

```jsx
import React from 'react';
import { ChatApp } from 'chat-app';

function App() {
  return (
    <div>
      <ChatApp endpoint="https://api.example.com/messages" />
    </div>
  );
}

export default App;
```

Replace `"https://api.example.com/messages"` with the actual endpoint URL to call when sending messages.

### Vue

1. Install the `chat-app` package via npm:

```bash
npm install chat-app
```

2. Import and use the `chat-app` component in your Vue component:

```vue
<template>
  <div>
    <ChatApp endpoint="https://api.example.com/messages" />
  </div>
</template>

<script>
import { ChatApp } from 'chat-app';

export default {
  components: {
    ChatApp
  }
};
</script>
```

Replace `"https://api.example.com/messages"` with the actual endpoint URL to call when sending messages.

## Props

The `chat-app` component accepts the following props:

- `endpoint` (required): The API endpoint URL to call when sending messages. This should be a string.

## Events

The `chat-app` component emits the following events:

- `messageSent`: Triggered when a message is successfully sent. You can attach an event listener to handle this event.

```javascript
const chatApp = document.querySelector('chat-app');

chatApp.addEventListener('messageSent', (event) => {
  console.log('Message sent:', event.detail);
});
```

## Styling

The UI of the `chat-app` component can be customized using CSS classes and styles. Refer to the provided `chat-app.css` file for the available classes.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize the README to match your specific project structure or requirements.