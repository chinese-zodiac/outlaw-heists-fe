import { Button, DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';

export default function DialogConfirm({
  children,
  sx,
  handleConfirmed,
  open,
  setOpen,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} sx={sx}>
        <DialogContent
          sx={{
            padding: '1em',
            background: 'white',
            border: 'solid 4px #701C1C',
            borderRadius: '10px',
            color: 'black',
          }}
        >
          {children}
          <Button
            onClick={handleClose}
            variant="outlined"
            autoFocus
            sx={{
              color: 'red',
              borderColor: 'red',
              margin: '1em',
              '&:hover': {
                color: 'darkRed',
                borderColor: 'darkRed',
                backgroundColor: 'lightRed',
              },
            }}
          >
            No, go back.
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleConfirmed();
            }}
            variant="outlined"
            autoFocus
            sx={{
              color: 'blue',
              borderColor: 'blue',
              margin: '1em',
              '&:hover': {
                color: 'darkBlue',
                borderColor: 'darkBlue',
                backgroundColor: 'lightBlue',
              },
            }}
          >
            Yes, do it!
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
