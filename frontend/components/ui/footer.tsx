import { FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white py-4 px-6 flex justify-center items-center">
      <div className="flex items-center text-center text-sm font-medium hover:text-gray-300">
        <FaTwitter />
        <a
          href="https://twitter.com/iamshanurrahman"
          className="text-gray-600 hover:text-blue-500"
        >
          Powered by LangChainAI. Demo created by Shanur (Twitter:
          @iamshanurrahman).
        </a>
      </div>
    </footer>
  );
};

export default Footer;
