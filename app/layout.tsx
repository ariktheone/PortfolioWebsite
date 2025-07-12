import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Figtree } from "next/font/google"

const figtree = Figtree({ subsets: ["latin"], display: "swap", variable: "--font-figtree" })

export const metadata: Metadata = {
  title: 'Arijit Mondal - AI/ML Researcher & Full-Stack Developer | Portfolio',
  description: 'AI/ML Researcher, Full-Stack Developer & Semiconductor Specialist with 3+ publications, 92% AI accuracy, and expertise in React, Python, TensorFlow. View projects, research, and professional experience.',
  keywords: [
    'Arijit Mondal',
    'AI/ML Researcher',
    'Full-Stack Developer',
    'Semiconductor Specialist',
    'React Developer',
    'Python Developer',
    'TensorFlow',
    'VLSI Design',
    'Electronics Engineering',
    'Machine Learning',
    'Deep Learning',
    'Web Development',
    'IEEE Publications',
    'Silvaco TCAD',
    'Portfolio'
  ].join(', '),
  authors: [{ name: 'Arijit Mondal' }],
  creator: 'Arijit Mondal',
  publisher: 'Arijit Mondal',
  robots: 'index, follow',
  metadataBase: new URL('https://arijitmondal-portfolio.vercel.app/'), // <-- update with your real domain
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arijitmondal.dev', // Update with your actual domain
    siteName: 'Arijit Mondal Portfolio',
    title: 'Arijit Mondal - AI/ML Researcher & Full-Stack Developer',
    description: 'Explore the portfolio of Arijit Mondal - AI/ML Researcher, Full-Stack Developer & Semiconductor Specialist with published research and innovative projects.',
    images: [
      {
        url: '/og-image.png', // Add an Open Graph image
        width: 1200,
        height: 630,
        alt: 'Arijit Mondal Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arijit Mondal - AI/ML Researcher & Full-Stack Developer',
    description: 'AI/ML Researcher & Full-Stack Developer with 3+ publications and expertise in React, Python, TensorFlow.',
    images: ['/og-image.png'], // Add a Twitter card image
    creator: '@arijitmondal', // Update with your actual Twitter handle
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
  },
  category: 'portfolio',
  classification: 'Professional Portfolio',
  applicationName: 'Arijit Mondal Portfolio',
  referrer: 'origin-when-cross-origin',
  manifest: '/manifest.json', // Add a web app manifest
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  themeColor: '#000000',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable}>
      <head>
        <meta name="format-detection" content="telephone=no" />

        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon_io/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon_io/android-chrome-512x512.png" />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon_io/favicon.ico" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Arijit Mondal",
              "jobTitle": "AI/ML Researcher & Full-Stack Developer",
              "description": "Electronics & Communication Engineering student specializing in AI/ML, Full-Stack Development, and Semiconductor Design",
              "url": "https://arijitmondal.dev", // Update with your actual domain
              "sameAs": [
                "https://github.com/ariktheone",
                "https://linkedin.com/in/arijitmondal30",
                "mailto:arijitmondal200430@gmail.com"
              ],
              "knowsAbout": [
                "Artificial Intelligence",
                "Machine Learning",
                "Full-Stack Development",
                "React.js",
                "Python",
                "TensorFlow",
                "Semiconductor Design",
                "VLSI",
                "Electronics Engineering"
              ],
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Institute of Engineering and Management, Kolkata"
              },
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "JavaScript for Beginners: The Complete Course",
                  "credentialCategory": "Professional Certificate",
                  "recognizedBy": {
                    "@type": "Organization",
                    "name": "Udemy"
                  }
                },
                {
                  "@type": "EducationalOccupationalCredential", 
                  "name": "Introduction to Machine Learning",
                  "credentialCategory": "Professional Certificate",
                  "recognizedBy": {
                    "@type": "Organization",
                    "name": "NPTEL (IIT Kharagpur)"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="bg-black min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
