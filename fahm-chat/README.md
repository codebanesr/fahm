# \<fahm-chat>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i fahm-chat
```

## Usage

```html
<script type="module">
  import 'fahm-chat/fahm-chat.js';
</script>

<fahm-chat></fahm-chat>
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`


----

# Framework specific docs

The `<fahm-chat>` component provides an easy way to integrate a chat interface into your application. 

However, some additional configuration may be required depending on your specific framework and design needs. Please refer to the platform-specific documentation below for details on integrating FahmChat into different frameworks. Some tweaking may be necessary to adapt FahmChat to your particular framework or use case.

The component documentation below provides examples for React, Angular, Vue, Svelte and vanilla JS, but these are just a starting point. Make sure to consult your framework's documentation for any specific requirements when adding custom Web Components like FahmChat.

Some additional styling or layout adjustments may be needed to seamlessly integrate the chat UI into your existing application. The component provides the core chat functionality, but full integration will depend on your specific implementation.

## Usage

The chat component takes two properties:

- `endpoint` - The API endpoint to connect to for chat  
- `apikey` - Your API key for authentication

Example:

```html
<fahm-chat
  endpoint="http://localhost:8080/_api/chat"
  apikey="yoursecretapikey">
</fahm-chat>
```

### React

Install the component:

```bash 
npm install @yourname/fahm-chat
```

Use in your component:

```jsx
import FahmChat from '@yourname/fahm-chat';

function App() {
  return (
    <FahmChat
      endpoint="http://localhost:8080/_api/chat"  
      apikey="yoursecretapikey"
    />
  );
}
```

### Angular

Install:

```
npm install @yourname/fahm-chat
```

Import and use:

```typescript
import { FahmChat } from '@yourname/fahm-chat';

@Component({/* */})
export class AppComponent {

  endpoint = 'http://localhost:8080/_api/chat';
  apikey = 'yoursecretapikey';

  render() {
    return (
      <fahm-chat
        [endpoint]="endpoint"
        [apikey]="apikey">
      </fahm-chat>
    );
  }

}
```

### Vue

Install:

```bash
npm install @yourname/fahm-chat
```

Use in component:

```vue
<script>
import FahmChat from '@yourname/fahm-chat';

export default {
  components: {
    FahmChat
  },
  data() {
    return {
      endpoint: 'http://localhost:8080/_api/chat',
      apikey: 'yoursecretapikey'
    }
  }
}  
</script>

<template>
  <FahmChat 
    :endpoint="endpoint"
    :apikey="apikey"
  />
</template>
```

### Svelte

Install:

```bash  
npm install @yourname/fahm-chat
```

Use in component:

```svelte
<script>
  import FahmChat from '@yourname/fahm-chat';

  let endpoint = 'http://localhost:8080/_api/chat';
  let apikey = 'yoursecretapikey'; 
</script>

<FahmChat {endpoint} {apikey}/>
```

### Vanilla JS

Install:

```bash
npm install @yourname/fahm-chat
```

Use:

```js
import { FahmChat } from '@yourname/fahm-chat';

const chat = new FahmChat();

chat.endpoint = 'http://localhost:8080/_api/chat';
chat.apikey = 'yoursecretapikey';

document.body.appendChild(chat);
```

Let me know if you need any other updates to the documentation!