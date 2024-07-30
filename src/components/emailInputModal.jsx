import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useTranslations } from 'next-intl';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const EmailModal = ({ open, handleClose, handleSave }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const t = useTranslations('CheckOut');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(''); // Reset error message on change
  };

  const handleSubmit = () => {
    if (!email) {
      setError('Email is required');
      return;
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    handleSave(email);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          {t('email')}
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          id="email"
          label={t('email')}
          type="email"
          className="mb-4"
          value={email}
          required
          onChange={handleEmailChange}
          error={Boolean(error)}
          helperText={error}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {t('button-1')}
        </Button>
      </Box>
    </Modal>
  );
};

export default EmailModal;
