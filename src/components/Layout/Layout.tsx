// import React, { ReactNode } from "react";
// import Header from "../Header/Header";
// // import Footer from "../Footer/Footer";
// import PropTypes from 'prop-types';
// import { AuthProvider } from "../../context/AuthContext";

// interface LayoutProps {
//     children: ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//     return (
//         <AuthProvider>
//             <Header />
//             {children}
//             {/* <Footer /> */}
//         </AuthProvider>
//     );
// };

// Layout.propTypes = {
//     children: PropTypes.node.isRequired,
// };

// export default Layout;
// import React from "react";
// =========
// import { ReactNode } from "react";
// import { AuthProvider } from "../../context/AuthContext";
// import Header from "../Header/Header";
// // import Footer from "../Footer/Footer";

// interface LayoutProps {
//     children: ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
//     return (
//         <AuthProvider>
//             <Header />
//             {children}
//             {/* <Footer /> */}
//         </AuthProvider>
//     );
// };

// export default Layout;
import React from 'react'; // React를 import 합니다.
import { ReactNode } from "react";
import { AuthProvider } from "../../context/AuthContext";
import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    return (
        <AuthProvider>
            <Header />
            {children}
            {/* <Footer /> */}
        </AuthProvider>
    );
};

export default Layout;
