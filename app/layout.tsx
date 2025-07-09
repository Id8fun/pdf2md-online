import type { Metadata } from 'next'
import Script from 'next/script'
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
    description: 'Instantly convert PDF documents to perfectly formatted Markdown. 100% browser-based conversion with OCR support.',
    url: 'https://pdf2md.id8.fun',
    siteName: 'PDF2MD',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'PDF2MD - PDF to Markdown Converter',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF2MD - Transform Your PDFs into Clean Markdown',
    description: 'Instantly convert PDF documents to perfectly formatted Markdown. 100% browser-based conversion with OCR support.',
    images: ['/logo.png'],
    creator: '@0xlauyu',
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
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KEVGP9K51N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KEVGP9K51N');
          `}
        </Script>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
