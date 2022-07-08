import * as React from "react";
import "./pageTemplate.css";
import { Link } from "react-router-dom";
import ShoppingCart from "../../components/shoppingCart/ShoppingCart";
import { useUser } from "../../context/userContext";
import { useApp } from "../../context/appContext";
import SnackBar from "../../components/snackBar/SnackBar";

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
              <button
                onClick={handleLogout}
                className="btn-2-primary mx-2 hover:btn-2-primary-hover active:btn-2-primary-clicked"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="btn-2-primary mx-2 hover:btn-2-primary-hover active:btn-2-primary-clicked">
                Login
              </button>
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
