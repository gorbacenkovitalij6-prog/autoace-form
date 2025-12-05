import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AutoEuropeTop - Подбор автомобилей из Европы',
  description: 'Форма для подбора идеального автомобиля из Европы',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script src="https://telegram.org/js/telegram-web-app.js" async />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
