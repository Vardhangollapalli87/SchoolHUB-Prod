import React, { useState, useEffect } from "react";
import Sidebar from "../Pages/Dashboard/Main-Dashboard/GlobalFiles/Sidebar.jsx";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsOpen(false);
      } else {
        setIsMobile(false);
        setIsOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
      <main
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-16"
        } p-4`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
