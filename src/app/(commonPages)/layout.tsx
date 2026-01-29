import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
import { ReactNode } from "react";

export default function HLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
