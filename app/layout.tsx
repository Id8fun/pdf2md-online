import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'PDF2MD - Transform Your PDFs into Clean Markdown | Free, Secure, Browser-Based Converter',
  description:
    'Convert PDF documents to perfectly formatted Markdown instantly in your browser. 100% privacy-focused: files never leave your device. Supports tables, headings, lists, code blocks, and more. Free unlimited conversions with AI-powered text extraction and multi-language support.',
  keywords: [
    'PDF to Markdown converter',
    'PDF2MD',
    'browser-based PDF converter',
    'free PDF to Markdown',
    'secure PDF conversion',
    'privacy-first PDF tool',
    'offline PDF converter',
    'PDF to MD online',
    'markdown export tool',
    'document converter',
    'PDF text extraction',
    'clean markdown format',
    'no upload required',
    'client-side PDF processing',
    'open source converter',
    'PDF parsing tool',
    'markdown generator',
    'document transformation',
    'PDF utility',
    'web-based converter'
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
    title: 'PDF2MD - Transform Your PDFs into Clean Markdown',
    description:
      'Convert PDF documents to perfectly formatted Markdown instantly in your browser. 100% privacy-focused: files never leave your device. Free unlimited conversions with professional-grade formatting.',
    url: 'https://pdf2md.id8.fun/',
    siteName: 'PDF2MD',
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
    title: 'PDF2MD - Transform Your PDFs into Clean Markdown',
    description:
      'Convert PDF documents to perfectly formatted Markdown instantly in your browser. 100% privacy-focused: files never leave your device. Free unlimited conversions with professional-grade formatting.',
    images: ['/logo.png'],
    creator: '@0xlauyu',
    site: '@0xlauyu',
  },
  icons: {
    icon: '/logo.ico',
    shortcut: '/logo.ico',
    apple: '/logo.png',
  },
  metadataBase: new URL('https://pdf2md.id8.fun'),
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
