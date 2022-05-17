import { useState, Dispatch } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ShoppingCartTable from "../shoppingCartTable/ShoppingCartTable";

export type Props = {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

export default function ShoppingCart({ setOpen, open }: Props) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="md"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Shopping Cart"}</DialogTitle>
      <DialogContent>
        {/* <DialogContentText id="alert-dialog-description">
          No items added.
        </DialogContentText> */}
        <ShoppingCartTable />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleClose} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
