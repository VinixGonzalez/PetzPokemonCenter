import { Inter } from "next/font/google";
import "../styles/globals.css";

const mulish = Inter({ subsets: ["latin"] });

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang={"pt"}>
      <body className={`${mulish.className}`}>{children}</body>
    </html>
  );
}

export const metadata = {
  title: "Simplefy",
  description: "Simplefy Simulator",
};
