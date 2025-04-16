import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <p style={styles.text}>© {new Date().getFullYear()} Naval Doc Web. All rights reserved.</p>
                <nav style={styles.nav}>
                    <a href="/privacy-policy" style={styles.link}>Privacy Policy</a>
                    <a href="/terms-of-service" style={styles.link}>Terms of Service</a>
                </nav>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '1rem 0',
        textAlign: 'center' as const,
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
    },
    text: {
        margin: '0.5rem 0',
    },
    nav: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginTop: '0.5rem',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
    },
};

export default Footer;