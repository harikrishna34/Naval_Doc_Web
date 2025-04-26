import React, { useState } from 'react';

const CanteenSelectionPage: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (canteen: string) => {
    setSelected(canteen);
  };

  const handleContinue = () => {
    if (selected) {
      alert(`Selected: ${selected}`);
    } else {
      alert('Please select a canteen!');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Left Side */}
        <div style={styles.left}>
          <label style={styles.label}>Select Canteen :-</label>
          {['Canteen 1', 'Canteen 2', 'Canteen 3'].map((canteen) => (
            <button
              key={canteen}
              onClick={() => handleSelect(canteen)}
              style={{
                ...styles.canteenButton,
                ...(selected === canteen ? styles.selected : {}),
              }}
            >
              {canteen}
            </button>
          ))}
          <button style={styles.continueButton} onClick={handleContinue}>
            Continue
          </button>
        </div>

        {/* Right Side */}
        <div style={styles.right}>
          <img
          src="https://www.joinindiannavy.gov.in/images/octaginal-crest.png"
          alt="Navy"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default CanteenSelectionPage;

// Inline CSS styles
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: '100vh',
  },
  card: {
    display: 'flex',
    width: '800px',
    height: '500px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    border: '2px solid #001f6b',
  },
  left: {
    flex: 1,
    padding: '30px 20px',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    backgroundColor: '#001f6b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  canteenButton: {
    padding: '12px',
    marginBottom: '15px',
    fontWeight: 'bold',
    fontSize: '15px',
    border: '1px solid #001f6b',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    color: '#001f6b',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  selected: {
    backgroundColor: '#e0ebff',
  },
  continueButton: {
    marginTop: '20px',
    padding: '14px',
    fontWeight: 'bold',
    fontSize: '16px',
    backgroundColor: '#2c55a1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  image: {
    width: '80%',
    maxWidth: '250px',
    objectFit: 'contain',
  },
};
