import * as React from "react";
import "./pageTemplate.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ShoppingCart from "../shoppingCart/ShoppingCart";
import { useUser } from "../../context/userContext";
import { UserContextType } from "../../@types/user.d";

interface Props {
  component: React.ReactNode;
}

export default function PageTemplate({ component }: Props) {
  const [open, setOpen] = React.useState(false);

  const { logoutUser, user } = useUser();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    logoutUser({ name: "", email: "" });
  };

  return (
    <div className="homeContainer">
      <ShoppingCart setOpen={setOpen} open={open} />
      <div className="header">
        <div className="header-left">
          {user?.name ? (
            <div className="header-left-items">
              <div className="header-profile">Hi {user?.name}</div>
              <div className="header-logout" onClick={handleLogout}>
                Logout
              </div>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
        <div className="header-center">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="header-center">Modern Walk</div>
          </Link>
        </div>
        <div className="header-right">
          <Button variant="contained" onClick={handleClickOpen}>
            Shopping Cart
          </Button>
        </div>
      </div>
      <hr className="hr"></hr>
      <div className="homeContent">
        <div className="content">{component}</div>
      </div>
    </div>
  );
}
