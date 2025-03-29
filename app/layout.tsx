import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MBTI性格测试 - 专业性格分析工具",
  description: "通过我们专业的MBTI性格测试，深入了解你的性格特质，发现你的优势与潜能。准确、科学、值得信赖。",
  keywords: ["MBTI", "性格测试", "人格分析", "职业规划", "自我认知"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
