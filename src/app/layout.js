import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://preppal-waitlist.vercel.app'),
  title: 'PrepPal - join the wailist',
  description:
    'be the first to access PrepPal, the AI-Powered study assistant that simplifies your learning.',
  icons: {
    icon: '/preppal-icon.png',
  },
  openGraph: {
    title: 'PrepPal - AI Study Assistant',
    description: 'Join our Waitlist to access the smartest way to study.',
    url:"https://preppal-waitlist.vercel.app",
    images: ['/prepalwaitlistimage.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrepPal - Your Smart Study Companion',
    description: 'Join our waitlist to access the smartest way to study.',
    images: ['/prepalwaitlistimage.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
