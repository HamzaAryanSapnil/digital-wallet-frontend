import { type ReactNode } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: IProps) {
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="w-full fixed z-50 bg-background">
        <Navbar />
      </div>
      <div className="grow pt-16">{children}</div>
      <Footer />
    </div>
  );
}
