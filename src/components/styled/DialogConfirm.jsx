import { Button, DialogContent, Typography } from '@mui/material';
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
          <br />
          <Button
            onClick={handleClose}
            variant="text"
            autoFocus
            sx={{
              padding: '0.5em 0em 0.25em 0em',
              width: '6em',
              marginRight: '3em',
              backgroundColor: '#701C1C',
              borderRadius: '0',
              color: 'white',
              display: 'inline-block',
              '&:hover': {
                backgroundColor: '#080830',
              },
            }}
          >
            <Typography sx={{ fontSize: '2em', lineHeight: '1em' }}>
              NO
            </Typography>
            GO BACK
          </Button>
          <Button
            onClick={() => {
              handleConfirmed();
            }}
            variant="text"
            autoFocus
            sx={{
              padding: '0.5em 0em 0.25em 0em',
              width: '6em',
              backgroundColor: '#701C1C',
              borderRadius: '0',
              color: 'white',
              display: 'inline-block',
              '&:hover': {
                backgroundColor: '#080830',
              },
            }}
          >
            <Typography sx={{ fontSize: '2em', lineHeight: '1em' }}>
              YES
            </Typography>
            DEW IT!
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
