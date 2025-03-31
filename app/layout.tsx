'use client';

import "./globals.css";
import { Inter } from "next/font/google";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// 包装器组件，用于访问语言上下文
function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const htmlLang = language === 'zh' ? 'zh-CN' : 'en';

  return (
    <html lang={htmlLang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <RootLayoutContent>
        {children}
      </RootLayoutContent>
    </LanguageProvider>
  );
}
