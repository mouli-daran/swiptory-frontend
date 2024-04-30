import React, { useEffect, useState } from "react";
import Mobile from "./Mobile";
import Desktop from "./Desktop";

const Navbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 650);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 650);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{isSmallScreen ? <Mobile /> : <Desktop />}</>;
};

export default Navbar;
