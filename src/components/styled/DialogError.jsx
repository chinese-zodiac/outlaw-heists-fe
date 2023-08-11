import { Button, DialogActions, DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';

export default function DialogError({ children, sx, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} sx={sx}>
        <DialogContent
          sx={{
            padding: '2em',
            backgroundColor: 'white',
            border: 'solid red',
            borderWidth: '4px 4px 0px 4px',
            color: 'black',
          }}
        >
          {children}
        </DialogContent>
        <DialogActions
          sx={{
            padding: '2em',
            backgroundColor: 'white',
            border: 'solid red',
            borderWidth: '0px 4px 4px 4px',
            color: 'black',
            ...sx,
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            autoFocus
            sx={{
              color: 'red',
              borderColor: 'red',
              '&:hover': {
                color: 'darkred',
                borderColor: 'darkRed',
                backgroundColor: 'pink',
              },
            }}
          >
            GOT IT!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
