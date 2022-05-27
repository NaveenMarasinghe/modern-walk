import * as React from "react";
import "./pageTemplate.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ShoppingCart from "../../components/shoppingCart/ShoppingCart";
import { useUser } from "../../context/userContext";

type Props = {
  children: React.ReactNode;
};

export default function PageTemplate({ children }: Props) {
  const [open, setOpen] = React.useState(false);

  const { logoutUser, user } = useUser();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="homeContainer">
      <ShoppingCart setOpen={setOpen} open={open} />
      <div className="header">
        <div className="header-left"></div>
        <div className="header-center">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="header-center">Modern Walk</div>
          </Link>
        </div>
        <div className="header-right">
          {user?.name ? (
            <div className="header-right-items">
              <Button sx={{ fontWeight: "bold" }}>Hi {user?.name}</Button>
              <Button onClick={handleClickOpen} sx={{ fontWeight: "bold" }}>
                Shopping Cart
              </Button>
              <Button onClick={handleLogout} sx={{ fontWeight: "bold" }}>
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                className="header-right-button"
                sx={{ fontWeight: "bold" }}
              >
                login
              </Button>
            </Link>
          )}
        </div>
      </div>
      <hr className="hr"></hr>
      <div className="homeContent">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
