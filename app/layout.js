import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/ui/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Starwars app",
  description: "Explore Starwars world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-mono">
        <Header />
        <div className="container mx-auto px-6">{children}</div>
      </body>
    </html>
  );
}
