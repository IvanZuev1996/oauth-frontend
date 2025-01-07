import { Montserrat } from 'next/font/google';

import '../../src/app/styles/index.css';
import { MainProvider } from '@/app/providers/MainProvider';

const montserrat = Montserrat({
  subsets: ['cyrillic'],
  variable: '--font-inter',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={montserrat.variable} lang="ru">
      <body>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
