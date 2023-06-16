import { useState } from 'react';
import { useRouter } from 'next/router';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    router.push('/api/auth/logout');
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-lg font-bold">Companion</h1>

      <div className="relative">
        <button
          className="flex items-center text-sm font-medium hover:text-gray-300"
          onClick={toggleDropdown}
        >
          <span className="mr-2">Profile</span>
          <svg
            className="w-4 h-4 fill-current text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 16l-6-6h12l-6 6z" />
          </svg>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg">
            <a
              href="javascript:void(0)"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
