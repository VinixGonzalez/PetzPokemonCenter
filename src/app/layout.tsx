import { Inter } from "next/font/google";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Providers } from "./providers";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang={"pt"}>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Petz Pokemon Center",
  description: "Petz Pokemon Center Project",
};
