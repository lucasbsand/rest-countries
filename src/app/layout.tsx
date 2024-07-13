import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const nunito = Nunito_Sans({
  weight: ['300', '600', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rest Countries',
  description: 'Rest Countries',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${nunito.className} w-full transition bg-light-background dark:bg-dark-background`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
