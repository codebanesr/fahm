import { Link } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import FileUploader from './ui/file-uploader';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const router = useRouter();

  const logout = () => {
    router.push('/api/auth/logout');
  };

  return (
    <div className="mx-auto flex flex-col space-y-4">
      <header className="container sticky top-0 z-40 bg-white">
        <div className="h-16 border-b border-b-slate-200 py-4">
          <nav className="ml-4 pl-6 flex items-center justify-between">
            <FileUploader />
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="hover:text-slate-600 cursor-pointer focus:outline-none"
              >
                Profile
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-md">
                  <ul>
                    <li>
                      <button
                        onClick={logout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
      <div>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
