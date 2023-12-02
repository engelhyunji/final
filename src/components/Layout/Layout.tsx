import React from "react";
import Headers from "../Headers/Headers";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
    return (
        <div>
            <Headers />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;

