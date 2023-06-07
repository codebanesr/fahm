import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <UserProvider>
        <main className={inter.variable}>
          <Component {...pageProps} />
        </main>
      </UserProvider>
  );
}

export default MyApp;
