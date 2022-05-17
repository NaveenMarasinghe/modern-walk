import { useState } from "react";
import "./pageTemplate.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ShoppingCart from "../shoppingCart/ShoppingCart";

interface Props {
  component: React.ReactNode;
}

export default function PageTemplate({ component }: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className="homeContainer">
      <ShoppingCart setOpen={setOpen} open={open} />
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="header">
          <div className="header-left"></div>
          <div className="header-center">Modern Walk</div>
          <div className="header-right">
            <Button variant="contained" onClick={handleClickOpen}>
              Shopping Cart
            </Button>
          </div>
        </div>
      </Link>
      <hr className="hr"></hr>
      <div className="homeContent">
        <div className="content">{component}</div>
      </div>
    </div>
  );
}
