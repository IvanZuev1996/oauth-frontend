import { Montserrat } from 'next/font/google';
import { cookies } from 'next/headers';

import { PageLayout } from '@/app/layouts/PageLayout/PageLayout';
import { MainProvider } from '@/app/providers/MainProvider';

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
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme')?.value;
  const theme = themeCookie === 'dark' ? 'dark' : 'light';
  const isSidebarOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <html className={montserrat.variable} lang="ru">
      <body className={theme}>
        <MainProvider>
          <PageLayout isSidebarOpen={isSidebarOpen}>{children}</PageLayout>
        </MainProvider>
      </body>
    </html>
  );
}
