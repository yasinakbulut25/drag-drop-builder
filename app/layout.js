import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Drag & Drop Page Builder",
  description:
    "Kullanıcıların bir sayfa düzenini görsel olarak oluşturmasını sağlayan bir Drag & Drop Page Builder uygulamasıdır.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
