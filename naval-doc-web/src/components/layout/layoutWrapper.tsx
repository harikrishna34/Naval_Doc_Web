import React from 'react';
import Header from './header';
import Footer from './footer';

interface LayoutWrapperProps {
    children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
    return (
        <div className="layout-wrapper">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default LayoutWrapper;