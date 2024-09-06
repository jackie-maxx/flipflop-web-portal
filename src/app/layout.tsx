import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/redux/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "FlipFlop",
    template: "%s - FlipFlop",
  },
  description: "Flipflop created by Khmer",

  icons: {
    icon: ["/assets/favicon/favicon.ico?v=1"],
    apple: ["/assets/favicon/apple-touch-icon.png?v=4"],
    shortcut: ["/assets/favicon/apple-touch-icon.png"],
  },
  manifest: "/assets/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/assets/favicon/favicon.ico" sizes="any" />
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
