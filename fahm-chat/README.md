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

## Framework specific docs
Sure! Here's an example README file for using the 'fahm-chat' component with Angular and React:

# Fahm Chat Component

This is a reusable chat component called 'fahm-chat' that can be used in Angular and React applications.

## Usage in Angular

1. Install the package:

```bash
npm install fahm-chat
```

2. Import the 'fahm-chat' component and register it as a custom element in your Angular component file:

```typescript
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FahmChat } from 'fahm-chat';

@Component({
  // Component metadata...
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyComponent {
  constructor() {
    customElements.define('fahm-chat', FahmChat);
  }
}
```

3. Use the 'fahm-chat' component in your Angular template:

```html
<fahm-chat></fahm-chat>
```

4. Make sure to add the necessary styles and assets required by the 'fahm-chat' component to your Angular project.

## Usage in React

1. Install the package:

```bash
npm install fahm-chat
```

2. Import the 'fahm-chat' component and register it as a custom element in your React component file:

```jsx
import React, { useEffect } from 'react';
import { FahmChat } from 'fahm-chat';

const MyComponent = () => {
  useEffect(() => {
    customElements.define('fahm-chat', FahmChat);
  }, []);

  return <fahm-chat></fahm-chat>;
};

export default MyComponent;
```

3. Use the 'fahm-chat' component in your React component.

4. Make sure to add the necessary styles and assets required by the 'fahm-chat' component to your React project.

## Customization

The 'fahm-chat' component supports customization through properties and events. Refer to the documentation for the available options and usage details.

## Development

To contribute or make modifications to the 'fahm-chat' component, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-repo/fahm-chat.git
```

2. Install dependencies:

```bash
npm install
```

3. Make the necessary modifications to the component code.

4. Build the component:

```bash
npm run build
```

5. Test the component and ensure it works as expected.

6. Submit a pull request with your changes.

## License

This component is released under the [MIT License](https://opensource.org/licenses/MIT).