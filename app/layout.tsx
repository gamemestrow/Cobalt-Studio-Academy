import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cobalt Studio Academy — Practical AI & Digital-Skills Programmes',
  description:
    'Six-week mentor-led cohorts in AI Workflows, Data Analytics, and Product Automation for university students and young professionals.',
  openGraph: {
    title: 'Cobalt Studio Academy — Practical AI & Digital-Skills Programmes',
    description:
      'Six-week mentor-led cohorts in AI Workflows, Data Analytics, and Product Automation for university students and young professionals.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cobalt Studio Academy — Practical AI & Digital-Skills Programmes',
    description:
      'Six-week mentor-led cohorts in AI Workflows, Data Analytics, and Product Automation for university students and young professionals.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
