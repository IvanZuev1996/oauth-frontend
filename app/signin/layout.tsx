import { Inter } from 'next/font/google';

import '../../src/app/styles/index.css';
import { MainProvider } from '@/app/providers/MainProvider';

const inter = Inter({ subsets: ['cyrillic'], variable: '--font-inter' });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.variable} lang="ru">
      <body>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
