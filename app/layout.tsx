import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Homemade",
  description: "This app is for service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' dir="rtl">
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap'
          rel='stylesheet'
        />
      </head>
      <body cz-shortcut-listen='true'>{children}</body>
    </html>
  );
}
