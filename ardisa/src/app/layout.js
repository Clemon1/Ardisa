import "./globals.css";
import { Poppins } from "next/font/google";
import { Providers } from "./provider";
import Navbar from "@/components/Global/Navbar";
import { TanstackProvider } from "@/components/Providers/Tanstack";

const poppin = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
});

export const metadata = {
  title: "Ardisa",
  description: "Ardisa is a online hotel system",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={poppin.className}>
        <Providers>
          <TanstackProvider>
            <Navbar />

            {children}
          </TanstackProvider>
        </Providers>
      </body>
    </html>
  );
}
