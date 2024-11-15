import React from 'react';

const Modal2 = ({ onClose, children, signUpRef }) => {
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    width: '90%',
    maxWidth: '500px',
    textAlign: 'center',
};

const closeButtonStyle = {
    float: 'right',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    color: '#3498db',
    cursor: 'pointer',
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    marginTop: '20px',
    fontSize: '16px',
};

export default Modal2;
