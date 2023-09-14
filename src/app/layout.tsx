import "../styles/globals.css";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang={"pt"}>
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: "Simplefy",
  description: "Simplefy Simulator",
};
