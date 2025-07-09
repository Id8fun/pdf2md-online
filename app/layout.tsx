import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'PDF to Markdown Converter – Free Unlimited, Secure, AI Translation, Multi-language Support - pdf2md.id8.fun',
  description:
    'Convert PDF files to Markdown instantly in your browser. 100% privacy: your files never leave your device. Supports headings, tables, lists, and more. Fast, free unlimited, and secure PDF to Markdown conversion tool. With AI translation and multi-language support, it\'s your ultimate PDF to MD file shortcut tool.',
  keywords: [
    'PDF to Markdown',
    'PDF converter',
    'Markdown converter',
    'browser-based PDF tool',
    'free unlimited PDF to Markdown',
    'secure PDF conversion',
    'privacy PDF tool',
    'open source PDF converter',
    'PDF to MD',
    'convert PDF',
    'markdown export',
    'no upload PDF converter',
    'offline PDF tool',
    'extract PDF text',
    'PDF to text',
    'PDF to markdown online',
    'PDF to markdown free unlimited',
    'PDF to markdown secure',
    'PDF to markdown browser',
    'AI translation',
    'multi-language support',
    'file shortcut tool',
  ],
  authors: [{ name: '0xlauyu' }],
  creator: '0xlauyu',
    publisher: '0xlauyu',
  applicationName: 'PDF to Markdown Converter',
  category: 'Utilities',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://pdf2md.id8.fun/',
  },
  openGraph: {
    title: 'PDF to Markdown Converter – Free Unlimited, Secure, AI Translation, Multi-language Support',
    description:
      'Convert PDF files to Markdown instantly in your browser. 100% privacy: your files never leave your device. Supports headings, tables, lists, and more. Fast, free unlimited, and secure PDF to Markdown conversion tool. With AI translation and multi-language support, it\'s your ultimate PDF to MD file shortcut tool.',
    url: 'https://pdf2md.id8.fun/',
    siteName: 'PDF to Markdown Converter',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'PDF to Markdown Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to Markdown Converter – Free Unlimited, Secure, AI Translation, Multi-language Support',
    description:
      'Convert PDF files to Markdown instantly in your browser. 100% privacy: your files never leave your device. Supports headings, tables, lists, and more. Fast, free unlimited, and secure PDF to Markdown conversion tool. With AI translation and multi-language support, it\'s your ultimate PDF to MD file shortcut tool.',
    images: ['/logo.png'],
    creator: '@0xlauyu',
    site: '@0xlauyu',
  },
  icons: {
    icon: '/logo.ico',
    shortcut: '/logo.ico',
    apple: '/logo.png',
  },
  metadataBase: new URL('https://pdftomarkdown.co'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}

      </body>
    </html>
  )
}
