import React from 'react';

const Modal = ({ onClose, children, signUpRef }) => {
    const handleGoToLoginClick = () => {
        onClose();
        if (signUpRef && signUpRef.current) {
            signUpRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <button onClick={onClose} style={closeButtonStyle}>✖</button>
                <div style={{ marginBottom: '20px' }}>{children}</div>
                
                <button onClick={handleGoToLoginClick} style={buttonStyle}>
                    Go to Login/Signup
                </button>
            </div>
        </div>
    );
};

const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '400px',
    width: '100%',
};

const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    position: 'absolute',
    top: '10px',
    right: '10px',
};

const buttonStyle = {
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
};

export default Modal;
