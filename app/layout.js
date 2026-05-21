import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "DocAppoint — Book Doctor Appointments Online",
  description: "DocAppoint is a modern doctor appointment booking platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
        <Navbar />
        <main style={{ width: "100%", overflowX: "hidden" }}>
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}