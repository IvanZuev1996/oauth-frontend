import { Montserrat } from 'next/font/google';

import { MainProvider } from '@/app/providers/MainProvider';
import { VStack } from '@/shared/ui/Stack';

import '../../src/app/styles/index.css';
import './auth.css';

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
        <VStack className="auth-page">
          <MainProvider>{children}</MainProvider>
          <div className="auth-page__bg"></div>
        </VStack>
      </body>
    </html>
  );
}
