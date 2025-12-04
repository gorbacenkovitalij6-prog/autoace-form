import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AutoAce - Подбор автомобилей',
  description: 'Форма для подбора идеального автомобиля',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
