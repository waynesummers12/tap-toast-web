import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./home/Navbar";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tap & Toast Mobile Bar",
  description: "Mobile bar service for weddings, parties, and private events.",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any", type: "image/png" },
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png"
  },
  manifest: "/site.webmanifest"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9T64PY883H"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9T64PY883H');
          `}
        </Script>
        <Script id="ga-book-click" strategy="afterInteractive">
          {`
            (function(){
              function track(e){
                var el = e.target.closest && e.target.closest('a[href="/book"], button[data-book="true"]');
                if(!el) return;
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'book_click', {
                    event_category: 'engagement',
                    event_label: 'Book CTA',
                    page_path: window.location.pathname
                  });
                }
              }
              document.addEventListener('click', track, true);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
