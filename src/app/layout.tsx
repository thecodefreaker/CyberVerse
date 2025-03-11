"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/index.css";
import "@/styles/performance.css"; // Import performance optimizations
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import ClientPowerSaveWrapper from "@/components/ui/ClientPowerSaveWrapper";
import { metadata } from "./metadata";

// Load main fonts with optimized settings
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false, // Disable font fallback which improves performance
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TEMPORARY DEBUG - Log when layout renders
  if (typeof window !== 'undefined') {
    console.log('[DEBUG] RootLayout rendering');
    console.log('[DEBUG] CSS Classes loaded:', {
      documentClasses: document.documentElement.className,
      bodyClasses: document.body.className,
    });
    
    // Check if stylesheets are loaded properly
    const styleSheets = Array.from(document.styleSheets);
    console.log('[DEBUG] Stylesheets loaded:', styleSheets.length);
    styleSheets.forEach((sheet, index) => {
      try {
        console.log(`[DEBUG] Sheet ${index} href:`, sheet.href);
      } catch (e) {
        console.log(`[DEBUG] Sheet ${index} (cannot access href - might be CORS restricted)`);
      }
    });
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Performance optimization: Preload critical font assets */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap"
          as="style"
        />
        
        {/* Google Fonts for cybersecurity theme with optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Load only essential font weights to reduce bandwidth */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Fira+Code:wght@400;500&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-dark-base text-white min-h-screen flex flex-col`}
      >
        {/* TEMPORARY DEBUG - Visible debugging info */}
        <div style={{ 
          position: 'fixed', 
          top: '0', 
          right: '0', 
          background: 'rgba(0,0,0,0.8)', 
          color: '#50fa7b', 
          padding: '10px', 
          zIndex: '9999',
          fontFamily: 'monospace',
          fontSize: '12px',
          maxWidth: '300px',
          maxHeight: '200px',
          overflow: 'auto'
        }}>
          <div>DEBUG MODE</div>
          <div>Theme: {typeof window !== 'undefined' ? document.documentElement.dataset.theme || 'none' : 'SSR'}</div>
          <div>Body Classes: {typeof window !== 'undefined' ? document.body.className : 'SSR'}</div>
        </div>

        <div className="flex-grow flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ClientPowerSaveWrapper />
        </div>
        
        {/* Performance measurement script - loads after everything else */}
        <Script id="performance-metrics" strategy="afterInteractive">
          {`
            // Report performance metrics
            window.addEventListener('load', () => {
              // Give browser time to finish all work
              setTimeout(() => {
                if (window.performance) {
                  const perfData = window.performance.timing;
                  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                  console.log('[DEBUG] Page load time:', pageLoadTime + 'ms');
                  
                  // Debug stylesheet status
                  const styleSheets = Array.from(document.styleSheets);
                  console.log('[DEBUG] StyleSheets after full load:', styleSheets.length);
                  
                  // Check critical CSS classes
                  console.log('[DEBUG] Critical CSS classes check:');
                  ['bg-dark-base', 'text-neon-green', 'font-cyber'].forEach(className => {
                    const testEl = document.createElement('div');
                    testEl.className = className;
                    document.body.appendChild(testEl);
                    const styles = window.getComputedStyle(testEl);
                    console.log(\`[DEBUG] Class "\${className}" applied: \`, {
                      backgroundColor: styles.backgroundColor,
                      color: styles.color,
                      fontFamily: styles.fontFamily
                    });
                    document.body.removeChild(testEl);
                  });
                }
              }, 0);
            });
            
            // Save resources by pausing animations when tab is not visible
            document.addEventListener('visibilitychange', () => {
              document.body.classList.toggle('tab-hidden', document.visibilityState !== 'visible');
              console.log('[DEBUG] Visibility changed:', document.visibilityState);
            });
          `}
        </Script>
      </body>
    </html>
  );
}
