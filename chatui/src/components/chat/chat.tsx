import { Component, h, Prop, State } from '@stencil/core';

export type Message = {
  type: 'apiMessage' | 'userMessage';
  message: string;
  isStreaming?: boolean;
  sourceDocs?: Document[];
};

@Component({
  tag: 'chat-ui',
  styleUrl: 'chat.css',
  shadow: true,
})
export class ChatUi {
  @Prop() endpoint: string = ''; // Input property to store the endpoint URL
  @State() messages: Message[] = [
    {
      type: 'userMessage',
      message: 'Hey there!',
    },
    {
      type: 'apiMessage',
      message: 'Hi! How can I help you?',
    },
    // Add more messages as needed
  ];

  @State() currentMessage: Message = null;

  @State() inputMessage: string = '';

  callEndpoint() {
    // Perform the API call to the provided endpoint
    fetch(this.endpoint)
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }

  handleInput(event: Event) {
    this.inputMessage = (event.target as HTMLInputElement).value;
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  sendMessage() {
    console.log(this.inputMessage);
    if (this.inputMessage.trim() === '') {
      return;
    }

    const newMessage: Message = {
      type: 'userMessage',
      message: this.inputMessage,
      isStreaming: false,
      sourceDocs: [],
    };

    this.messages = [...this.messages, newMessage];
    this.inputMessage = '';
  }

  render() {
    return (
      <div class="flex flex-col h-screen">
        <div class="flex-grow">
          {/* Chat messages */}
          <div class="flex flex-col space-y-4 p-4">
            {this.messages.map((message, index) => (
              <div key={index} class="flex flex-col space-y-2">
                <div class="flex items-center space-x-2">
                  <img
                    src={
                      message.type === 'userMessage'
                        ? 'https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg'
                        : 'https://static.vecteezy.com/system/resources/previews/002/002/257/original/beautiful-woman-avatar-character-icon-free-vector.jpg'
                    }
                    alt="User"
                    class="h-8 w-8 rounded-full"
                  />
                  <span class="font-semibold text-gray-800">{message.type === 'userMessage' ? 'User 1' : 'User 2'}</span>
                </div>
                <div class="p-2 bg-gray-200 rounded-xl">
                  <p class="text-gray-800">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input box */}
        <div class="p-4 bg-gray-100">
          <div class="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Type a message"
              class="flex-grow px-4 py-2 rounded-full bg-white border border-gray-200 focus:outline-none"
              value={this.inputMessage}
              onInput={event => this.handleInput(event)}
              onKeyPress={event => this.handleKeyPress(event)}
            />
            <button class="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white" onClick={() => this.sendMessage()}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
