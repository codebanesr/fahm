import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

interface ChatResponse {
  text: string;
  sourceDocuments: Array<{ [key: string]: any }>; // Adjust the type accordingly
}

export class FahmChat extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .flex-grow {
      flex-grow: 1;
    }

    .flex-col {
      flex-direction: column;
    }

    .flex {
      display: flex;
    }

    .space-y-2 > :not([hidden]) ~ :not([hidden]) {
      margin-top: 0.5rem;
    }

    .space-x-2 > :not([hidden]) ~ :not([hidden]) {
      margin-left: 0.5rem;
    }

    .p-2 {
      padding: 0.5rem;
    }

    .p-4 {
      padding: 1rem;
    }

    .m-4 {
      margin: 1rem;
    }

    .h-screen {
      height: 100vh;
    }

    .h-8 {
      height: 2rem;
    }

    .w-8 {
      width: 2rem;
    }

    .h-10 {
      height: 2.5rem;
    }

    .w-10 {
      width: 2.5rem;
    }

    .rounded-full {
      border-radius: 9999px;
    }

    .bg-gray-100 {
      background-color: #f3f4f6;
    }

    .bg-gray-200 {
      background-color: #e5e7eb;
    }

    .bg-blue-500 {
      background-color: #3b82f6;
    }

    .text-gray-800 {
      color: #1f2937;
    }

    .text-white {
      color: #ffffff;
    }

    .border {
      border-width: 1px;
    }

    .border-gray-200 {
      border-color: #e5e7eb;
    }

    .focus\:outline-none:focus {
      outline: none;
      box-shadow: none;
    }

    svg {
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
    }
    .flex {
      display: flex;
    }
    .flex-col {
      flex-direction: column;
    }
    .flex-grow {
      flex-grow: 1;
    }
    .space-y-4 {
      margin-bottom: 1rem;
    }
    .p-4 {
      padding: 1rem;
    }
    .space-y-2 > :not(:last-child) {
      margin-bottom: 0.5rem;
    }
    .items-center {
      align-items: center;
    }
    .space-x-2 > :not(:last-child) {
      margin-right: 0.5rem;
    }
    .h-8 {
      height: 2rem;
    }
    .w-8 {
      width: 2rem;
    }
    .rounded-full {
      border-radius: 9999px;
    }
    .font-semibold {
      font-weight: 600;
    }
    .text-gray-800 {
      color: #1f2937;
    }
    .bg-gray-200 {
      background-color: #edf2f7;
    }
    .rounded-xl {
      border-radius: 0.75rem;
    }
    .text-gray-800 {
      color: #1f2937;
    }
    .bg-gray-100 {
      background-color: #f7fafc;
    }
    .space-x-4 > :not(:last-child) {
      margin-right: 1rem;
    }
    .flex-grow {
      flex-grow: 1;
    }
    .px-4 {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    .py-2 {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
    .bg-white {
      background-color: #ffffff;
    }
    .border {
      border-width: 1px;
    }
    .border-gray-200 {
      border-color: #edf2f7;
    }
    .focus\:outline-none:focus {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
    .h-10 {
      height: 2.5rem;
    }
    .w-10 {
      width: 2.5rem;
    }
    .bg-blue-500 {
      background-color: #3b82f6;
    }
    .text-white {
      color: #ffffff;
    }
    .h-6 {
      height: 1.5rem;
    }
    .w-6 {
      width: 1.5rem;
    }
    .stroke-current {
      stroke-width: 2;
    }
    .stroke-current {
      stroke: currentColor;
    }
    .round {
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .m-auto {
      margin: auto;
    }
  `;

  static properties = {
    endpoint: { type: String },
    apikey: { type: String },
  };

  @state() messages: { type: string; message: string }[] = [];
  @state() inputMessage = '';

  async makeChatRequest() {
    const headers = {
      accept: '*/*',
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
      question: this.inputMessage,
      history: this.messages.map((m) => m.message),
      user_dir: 'yourapikeyhere',
    });

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        throw new Error('Request failed with status: ' + response.status);
      }

      const data: ChatResponse = await response.json();
      this.messages = [
        ...this.messages,
        { message: data.text, type: 'Assistant' },
      ];
      // Process the response data here
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
    }
  }

  handleKeyPress(event: any) {
    this.inputMessage = event.target.value;

    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  async sendMessage() {
    if (this.inputMessage.trim() === '') {
      return;
    }

    const newMessage = {
      type: 'Human',
      message: this.inputMessage,
      isStreaming: false,
      sourceDocs: [],
    };

    this.messages = [...this.messages, newMessage];

    await this.makeChatRequest();
    this.inputMessage = '';
  }

  // @input=${(event: any) => this.handleInput(event)}

  @property({ type: String }) endpoint = 'http://localhost:8080/_api/chat';
  @property({ type: String }) apikey = 'yoursecretapikey';
  render() {
    return html`
      <div class="flex flex-col h-screen">
        <div class="flex-grow">
          <!-- Chat messages -->
          <div class="flex flex-col space-y-4 p-4">
            ${this.messages.map(
              (message, index) => html`
                <div key=${index} class="flex flex-col space-y-2">
                  <div class="flex items-center space-x-2">
                    <img
                      src=${message.type === 'userMessage'
                        ? 'https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg'
                        : 'https://static.vecteezy.com/system/resources/previews/002/002/257/original/beautiful-woman-avatar-character-icon-free-vector.jpg'}
                      alt="User"
                      class="h-8 w-8 rounded-full"
                    />
                    <span class="font-semibold text-gray-800"
                      >${message.type === 'userMessage'
                        ? 'User 1'
                        : 'User 2'}</span
                    >
                  </div>
                  <div class="p-2 bg-gray-200 rounded-xl">
                    <p class="text-gray-800">${message.message}</p>
                  </div>
                </div>
              `,
            )}
          </div>
        </div>

        <!-- Input box -->
        <div class="p-4 bg-gray-100">
          <div class="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Type a message"
              class="flex-grow px-4 py-2 rounded-full bg-white border border-gray-200 focus:outline-none"
              .value=${this.inputMessage}
              @keypress=${(event: any) => this.handleKeyPress(event)}
            />
            <button
              class="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white"
              @click=${() => this.sendMessage()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  class="round"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
