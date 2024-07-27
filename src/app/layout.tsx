import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import ReactQueryProvider from "./components/ReactQueryProvider";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn React Query",
  description: "Learn React Query",
  icons: {
    icon: "https://seeklogo.com/images/R/react-query-logo-1340EA4CE9-seeklogo.com.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ReactQueryProvider>
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
    // </ReactQueryProvider>
  );
}
