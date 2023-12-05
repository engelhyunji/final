import React, { ReactNode } from "react";
import Headers from "../Headers/Headers";
import Footer from "../Footer/Footer";
import PropTypes from 'prop-types';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Headers />
            {children}
            <Footer />
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
