import { Montserrat } from 'next/font/google';

import { MainProvider } from '@/app/providers/MainProvider';
import { WithAuthBg } from '@/shared/ui/WithAuthBg/WithAuthBg';

import '../../src/app/styles/index.css';

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
        <WithAuthBg>
          <MainProvider>{children}</MainProvider>
        </WithAuthBg>
      </body>
    </html>
  );
}
