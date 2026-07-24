import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akshhkaushik.github.io"),
  title: "Aksh Kaushik",
  description: "I'm Aksh. I build things, then take them apart to see how they work.",
  authors: [{ name: "Aksh Kaushik" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aksh Kaushik",
    description: "I'm Aksh. I build things, then take them apart to see how they work.",
    url: "/",
    siteName: "Aksh Kaushik",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f5f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `js` class is added to <html> before hydration by the inline script below
    // (progressive enhancement). Suppress the expected className mismatch on <html>.
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} min-h-full bg-paper text-ink antialiased`}
      >
        {/* Mark JS as available before paint so reveal animations enhance without a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {children}
      </body>
    </html>
  );
}
