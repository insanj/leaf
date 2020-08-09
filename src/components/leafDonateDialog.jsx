import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function LeafDonateDialog({ open, onCloseClick }) {
  return (
    <Dialog
      open={open}
      onClose={onCloseClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={'lg'}
      fullWidth
    >
      <DialogContent>
        
        <iframe src="https://givebutter.com/embed/c/0Wq1Gu" width="100%" height="615px" name="givebutter" frameborder="0" scrolling="no" seamless allowpaymentrequest style={{ borderRadius: '10px' }}></iframe>
        <script src="https://givebutter.com/js/widget.js"></script>

      </DialogContent>

      <DialogActions>
        <Button onClick={onCloseClick} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
