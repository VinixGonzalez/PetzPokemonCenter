import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang={"pt"}>
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}

export const metadata = {
  title: "Petz Pokemon Center",
  description: "Petz Pokemon Center Project",
};
