import { Button, DialogContent, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/system';
import * as React from 'react';

export default function DialogError({ children, title, sx, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} sx={{ ...sx }}>
        <DialogContent
          sx={{
            padding: '1em',
            backgroundColor: 'white',
            border: 'solid #6E1C1C 4px',
            color: 'black',
            textAlign: 'left',
          }}
        >
          <Box sx={{ maxWidth: '100%', width: '100vw' }}>
            <Box
              as="img"
              src="./images/STOP COWBOY.png"
              sx={{
                width: '45%',
                position: 'absolute',
                bottom: '4px',
                right: '4px',
              }}
            />
            <Typography
              as="h1"
              sx={{
                margin: '0',
                lineHeight: '1em',
                color: '6E1C1C',
                fontSize: '3em',
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                position: 'relative',
                textShadow:
                  'white 0px 0px 2px,white 0px 0px 4px,white 0px 0px 8px',
              }}
            >
              {children}
            </Box>
            <Button
              onClick={handleClose}
              variant="text"
              autoFocus
              sx={{
                color: 'white',
                backgroundColor: '#6E1C1C',
                display: 'block',
                marginTop: '1em',
                paddingTop: '0.1em',
                paddingBottom: '0',
                width: '5em',
                lineHeight: '1.2em',
                fontSize: '2em',
                '&:hover': {
                  backgroundColor: '#6E1C1C',
                },
              }}
            >
              GOT IT!
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
