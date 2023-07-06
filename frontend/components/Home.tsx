import LoadingDots from '@/components/ui/LoadingDots';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import styles from '@/styles/Home.module.css';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Document } from 'langchain/document';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  type: 'userMessage' | 'apiMessage';
  message: string;
  sourceDocs?: Document[];
}

interface ChatComponentProps {
  apiEndpoint: string;
  initialState: {
    query: string;
    messages: Message[];
    error: string | null;
    loading: boolean;
    messageState: {
      messages: Message[];
      history: [];
    };
  };
}

export const ChatComponent = ({
  apiEndpoint,
  initialState,
}: ChatComponentProps) => {
  const { user, isLoading } = useUser();
  const [query, setQuery] = useState(initialState.query || '');
  const [loading, setLoading] = useState(initialState.loading || false);
  const [error, setError] = useState(initialState.error || null);
  const [messageState, setMessageState] = useState(initialState.messageState);

  const { messages, history } = messageState;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null);

    if (!query) {
      alert('Please input a question');
      return;
    }

    const question = query.trim();

    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: 'userMessage',
          message: question,
        },
      ],
    }));

    setLoading(true);
    setQuery('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          history,
          user_dir: user?.email,
        }),
      });
      const data = await response.json();
      console.log('data', data);

      if (data.error) {
        setError(data.error);
      } else {
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'apiMessage',
              message: data.text,
              sourceDocs: data.sourceDocuments,
            },
          ],
          history: [...state.history, [question, data.text]],
        }));
      }
      console.log('messageState', messageState);

      setLoading(false);

      messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
    } catch (error) {
      setLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
      console.log('error', error);
    }
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && query) {
      handleSubmit(e);
    } else if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return  <div className="mx-auto flex flex-col gap-4">
    <main className={styles.main}>
      <div className={styles.cloud}>
        <div ref={messageListRef} className={styles.messagelist}>
          {messages.map((message, index) => {
            let icon;
            let className;
            if (message.type === 'apiMessage') {
              icon = (
                <Image
                  key={index}
                  src="/bot-image.png"
                  alt="AI"
                  width="40"
                  height="40"
                  className={styles.boticon}
                  priority
                />
              );
              className = styles.apimessage;
            } else {
              icon = (
                <Image
                  key={index}
                  src="/usericon.png"
                  alt="Me"
                  width="30"
                  height="30"
                  className={styles.usericon}
                  priority
                />
              );
              className =
                loading && index === messages.length - 1
                  ? styles.usermessagewaiting
                  : styles.usermessage;
            }
            return (
              <React.Fragment key={`chatMessage-${index}`}>
                <div className={className}>
                  {icon}
                  <div className={styles.markdownanswer}>
                    <ReactMarkdown linkTarget="_blank">
                      {message.message}
                    </ReactMarkdown>
                  </div>
                </div>
                {message.sourceDocs && (
                  <div className="p-5" key={`sourceDocsAccordion-${index}`}>
                    <Accordion
                      type="single"
                      collapsible
                      className="flex-col"
                    >
                      {message.sourceDocs.map((doc, index) => (
                        <div key={`messageSourceDocs-${index}`}>
                          <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger>
                              <h3>Source {index + 1}</h3>
                            </AccordionTrigger>
                            <AccordionContent>
                              <ReactMarkdown linkTarget="_blank">
                                {doc.pageContent}
                              </ReactMarkdown>
                              <p className="mt-2">
                                <b>Source:</b> {doc.metadata.source}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        </div>
                      ))}
                    </Accordion>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.cloudform}>
          <form onSubmit={handleSubmit}>
            <textarea
              disabled={loading}
              onKeyDown={handleEnter}
              ref={textAreaRef}
              autoFocus={false}
              rows={1}
              maxLength={512}
              id="userInput"
              name="userInput"
              placeholder={
                loading ? 'Waiting for response...' : 'Ask a question'
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.textarea}
            />
            <button
              type="submit"
              disabled={loading}
              className={styles.generatebutton}
            >
              {loading ? (
                <div className={styles.loadingwheel}>
                  <LoadingDots color="#000" />
                </div>
              ) : (
                <svg
                  viewBox="0 0 20 20"
                  className={styles.svgicon}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4    .571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
      {error && (
        <div className="border border-red-400 rounded-md p-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </main>
  </div>
);

};

export default ChatComponent;
