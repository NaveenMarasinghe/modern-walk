import * as React from "react";
import "./pageTemplate.css";
import { Link } from "react-router-dom";
import ShoppingCart from "../../components/shoppingCart/ShoppingCart";
import { useUser } from "../../context/userContext";
import { useApp } from "../../context/appContext";
import SnackBar from "../../components/snackBar/SnackBar";
import Button from "../../components/button/Button";

type Props = {
  children: React.ReactNode;
};

export default function PageTemplate({ children }: Props) {
  const [open, setOpen] = React.useState(false);

  const { logoutUser, user } = useUser();

  const handleLogout = () => {
    logoutUser();
    openAlert("Logged out successfully");
  };

  const { alertMessage, openAlert } = useApp();

  return (
    <div className="homeContainer">
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
              <ShoppingCart setOpen={setOpen} open={open} />
              <Button varient="primary" onClick={handleLogout} className="mx-2">
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button varient="primary">Login</Button>
            </Link>
          )}
        </div>
      </div>
      <hr className="hr"></hr>
      <div className="homeContent">
        <div className="content">{children}</div>
      </div>
      <SnackBar alert={alertMessage} />
    </div>
  );
}
