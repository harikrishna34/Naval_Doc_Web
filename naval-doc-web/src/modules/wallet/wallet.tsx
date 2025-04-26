import React from 'react';
import WalletBalance from './walletBalance';
import TransactionHistory from './transactionHistory';
import WorldtekLogo from '../../components/common/worldTekLogo';

const Wallet: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    maxWidth: '75%',
    margin: '0 auto',
    padding: '20px',
    minHeight: '100vh',
    background: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column'
  };

  const contentStyle: React.CSSProperties = {
    flex: 1
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 600,
    color: '#333',
    marginBottom: '24px'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>Wallet</h1>
        <WalletBalance />
        <TransactionHistory />
      </div>
      <WorldtekLogo />
    </div>
  );
};

export default Wallet;