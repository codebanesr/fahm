import { useUser } from '@auth0/nextjs-auth0/client';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const tools = [
  {
    title: 'Chatbot',
    description:
      'Engage users with conversational AI using our powerful chatbot.',
    learnMoreLink: '/chatbot',
    tryNowLink: '/chatbot-demo',
  },
  {
    title: 'Feature Extraction',
    description:
      'Extract meaningful features from your data using our advanced algorithms.',
    learnMoreLink: '/feature-extraction',
    tryNowLink: '/feature-extraction-demo',
  },
  {
    title: 'Custom Knowledge Base',
    description:
      'Build your own knowledge base using generative AI and enhance your applications.',
    learnMoreLink: '/knowledge-base',
    tryNowLink: '/knowledge-base-demo',
  },
];

const Landing: React.FC = () => {
  const { isLoading, user } = useUser();
  const router = useRouter();

  const handleTryNow = (link: string) => {
    if (!isLoading && !user) {
      router.push('/api/auth/login');
    } else {
      router.push(link);
    }
  };

  return (
    <div>
      <Head>
        <title>My AI Tools Suite</title>
      </Head>
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Welcome to My AI Tools Suite!
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Sign up or log in to access the features of our amazing AI tools.
          </p>
          <div className="mt-8">
            <div className="flex justify-center">
              {tools.map((tool, index) => (
                <div key={index} className="w-1/3 p-4">
                  <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold">{tool.title}</h2>
                    <p className="mt-2 text-gray-600">{tool.description}</p>
                    <div className="flex mt-4">
                      <Link
                        href={tool.learnMoreLink}
                        className="mr-4 text-base font-medium text-blue-600 hover:text-blue-500"
                      >
                        Learn More
                      </Link>
                      <Link
                        href="#"
                        onClick={() => handleTryNow(tool.tryNowLink)}
                        className="text-base font-medium text-blue-600 hover:text-blue-500"
                      >
                        Try Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <a
                href="/signup"
                className="text-base font-medium text-blue-600 hover:text-blue-500"
              >
                Sign Up
              </a>
              <Link
                href="/api/auth/login"
                className="ml-4 text-base font-medium text-blue-600 hover:text-blue-500"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
