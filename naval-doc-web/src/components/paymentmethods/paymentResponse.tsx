
const paymentData = {
    amount: 200.0,
    payment_method: "Paypal",
    isSuccessful: true,
    charge_id: "1001",
    transaction_id: "1001",
    date: "8/7/2017 12:00:00 AM",
};

const PaymentResponse  = () => {
    return (
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            background: '#ffffff',
            fontFamily: 'Arial, sans-serif'
        }}>
            {/* Header */}
            <header style={{
                background: '#000080',
                padding: '12px 0',
                borderBottom: '2px solid #001155'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 20px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'white'
                    }}>
                        <img
                            src="https://www.joinindiannavy.gov.in/images/octaginal-crest.png"
                            alt="Navy Logo"
                            style={{ width: '40px', height: '40px', marginRight: '12px' }}
                        />
                        <h1 style={{ 
                            margin: 0, 
                            fontSize: '20px', 
                            fontWeight: '700',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}>
                            WELFARE CANTEEN PAYMENT PORTAL
                        </h1>
                    </div>
                    <nav style={{ color: 'white' }}>
                        <span style={{ 
                            margin: '0 15px', 
                            cursor: 'pointer',
                            fontSize: '14px',
                            opacity: 0.9
                        }}>Home</span>
                        <span style={{ 
                            margin: '0 15px', 
                            cursor: 'pointer',
                            fontSize: '14px',
                            opacity: 0.9
                        }}>Support</span>
                        <span style={{ 
                            margin: '0 15px', 
                            cursor: 'pointer',
                            fontSize: '14px',
                            opacity: 0.9
                        }}>Contact</span>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main style={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '20px',
                background: '#ffffff'
            }}>
                <div style={{
                    background: "#fff",
                    maxWidth: 500,
                    width: '100%',
                    borderRadius: 15,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    padding: "24px 20px",
                    textAlign: "center",
                }}>
                    {/* Header with Logo and Reference Code */}
                    <div style={{
                        marginBottom: 16,
                        background: "#000080",
                        borderRadius: 8,
                        padding: "16px 0 12px 0",
                        color: "#fff",
                    }}>
                        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
                            WELFARE CANTEEN
                        </div>
                        <img
                            src="https://www.joinindiannavy.gov.in/images/octaginal-crest.png"
                            alt="Logo"
                            style={{ maxWidth: "10%", maxHeight: "10%", marginBottom: 8 }}
                        />
                        <div style={{ fontSize: 12, color: "#bbdefb", marginBottom: 4 }}>
                            Reference Code: {paymentData.transaction_id}
                        </div>
                    </div>

                    <h2 style={{ marginBottom: 12, fontSize: 20 }}>Transaction Successful!</h2>
                    <div style={{ marginBottom: 16 }}>
                        <span style={{
                            display: "inline-block",
                            background: "#4caf50",
                            borderRadius: "50%",
                            width: 36,
                            height: 36,
                            lineHeight: "36px",
                        }}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                style={{ verticalAlign: "middle" }}
                            >
                                <circle cx="12" cy="12" r="12" fill="#4caf50" />
                                <path
                                    d="M7 13l3 3 7-7"
                                    stroke="#fff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </div>
                    <hr style={{ margin: "16px 0" }} />
                    <table style={{ margin: "0 auto", textAlign: "left", fontSize: 14 }}>
                        <tbody>
                            <tr>
                                <td style={{ fontWeight: 600, padding: "6px 20px 6px 0" }}>Amount</td>
                                <td>₹{paymentData.amount.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600, padding: "6px 20px 6px 0" }}>Payment Method</td>
                                <td>{paymentData.payment_method}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600, padding: "6px 20px 6px 0" }}>Status</td>
                                <td>
                                    {paymentData.isSuccessful ? (
                                        <span style={{
                                            display: "inline-block",
                                            width: 16,
                                            height: 16,
                                            background: "#4caf50",
                                            borderRadius: "50%",
                                            textAlign: "center",
                                        }}>
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                style={{ verticalAlign: "middle" }}
                                            >
                                                <path
                                                    d="M7 13l3 3 7-7"
                                                    stroke="#fff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                    ) : (
                                        <span style={{
                                            display: "inline-block",
                                            width: 16,
                                            height: 16,
                                            background: "#f44336",
                                            borderRadius: "50%",
                                        }} />
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600, padding: "6px 20px 6px 0" }}>Charge ID</td>
                                <td>{paymentData.charge_id}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600, padding: "6px 20px 6px 0" }}>Transaction ID</td>
                                <td>{paymentData.transaction_id}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600, padding: "6px 20px 6px 0" }}>Date</td>
                                <td>{paymentData.date}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div style={{ marginTop: 20, display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <button style={{
                            background: '#000080',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600'
                        }}>
                            Print Receipt
                        </button>
                        <button style={{
                            background: 'transparent',
                            color: '#000080',
                            border: '1px solid #000080',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600'
                        }}>
                            Download PDF
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer style={{
                background: '#000080',
                color: 'white',
                padding: '16px 0',
                borderTop: '2px solid #001155'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <div style={{ fontSize: '12px', opacity: 0.8 }}>
                        © 2024 Indian Navy Welfare Canteen. All rights reserved.
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.8 }}>
                        <span style={{ margin: '0 10px' }}>Privacy Policy</span>
                        <span style={{ margin: '0 10px' }}>Terms of Service</span>
                        <span style={{ margin: '0 10px' }}>Help Center</span>
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.8 }}>
                        Secure Payment Gateway | SSL Protected
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PaymentResponse ;