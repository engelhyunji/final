import React from "react";
import Headers from "../Headers/Headers";
import Footer from "../Footer/Footer";
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
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
