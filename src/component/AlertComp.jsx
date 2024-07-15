import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertComp = ({ text, variant = 'primary', open, setOpen }) => {
  return (
    <>
      {open && text && (
        <Alert
          key={variant}
          variant={variant}
          onClose={() => setOpen(false)}
          style={{ position: 'absolute', zIndex: 100, right: 24, top: 24 }}
          dismissible
        >
          {text}
        </Alert>
      )}
    </>
  );
};

export default AlertComp;
