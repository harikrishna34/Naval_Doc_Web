import React, { useEffect, useState } from 'react';

const Contact: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle: React.CSSProperties = {
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isMobile ? '20px' : '0px',
  };

  const wrapperStyle: React.CSSProperties = {
    maxWidth: '1100px',
    width: '100%',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: '3rem',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const leftStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: isMobile ? '100%' : '600px',
    textAlign: isMobile ? 'center' : 'left',
  };

  const headingSmallStyle: React.CSSProperties = {
    fontSize: '25px',
    fontWeight: 500,
    marginBottom: '3rem',
  };

  const headingLargeStyle: React.CSSProperties = {
    fontSize: '3.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  };

  const paragraphStyle: React.CSSProperties = {
    marginBottom: '1.5rem',
    fontSize: '20px',
  };

  const infoStyle: React.CSSProperties = {
    fontSize: '20px',
    lineHeight: '1.8',
  };

  const rightStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: isMobile ? '100%' : '500px',
    display: 'flex',
    justifyContent: 'center',
    marginTop: isMobile ? '2rem' : '0',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '300px',
    marginLeft: isMobile ? '0' : '5rem',
    objectFit: 'contain',
  };

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        {/* Left Section */}
        <div style={leftStyle}>
          <p style={headingSmallStyle}>How can we help you?</p>
          <h1 style={headingLargeStyle}>Contact us</h1>
          <p style={paragraphStyle}>
            We’re here to help and answer any questions you might have. We look forward to hearing from you!
          </p>
          <div style={infoStyle}>
            <p>
              📍 <strong>Address:</strong> India
            </p>
            <p>
              📞 <strong>Phone:</strong> +91 71 99 77 07
            </p>
            <p>
              📧 <strong>Email:</strong>{' '}
              <a href="mailto:mail@navy.com" style={{ color: '#1e88e5', textDecoration: 'none' }}>
                mail@navy.com
              </a>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div style={rightStyle}>
          <img
            src="/public/Naval1.png"
            alt="Hello Illustration"
            style={imageStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
