import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "Blog - Ahmet Efe Akyazı",
  description: "Kişisel blog sitesi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Suspense fallback={<Loading />}>
        <body className={robotoMono.className}>{children}</body>
      </Suspense>
    </html>
  );
}
