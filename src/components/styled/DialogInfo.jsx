import Dialog from '@mui/material/Dialog';
import * as React from 'react';

export default function DialogInfo({ btn, children, sx }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const OpenButton = btn;

  return (
    <>
      {React.cloneElement(btn, {
        onClick: handleClickOpen,
      })}
      <Dialog onClose={handleClose} open={open} sx={sx}>
        {children}
      </Dialog>
    </>
  );
}
