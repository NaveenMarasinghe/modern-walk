import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { useUser } from "../../context/userContext";
import { useApp } from "../../context/appContext";
import { Navigate } from "react-router-dom";
import { UserAPI } from "../../services/user.services";
import PageTemplate from "../../sections/pageTemplate/PageTemplate";
import "./login.css";

export default function Login() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [redirect, setRedirect] = React.useState<boolean>(false);

  const { loginUser } = useUser();
  const { openAlert } = useApp();

  const handleSubmit = async () => {
    const response: any = await UserAPI.login(email, password);
    if (response.data) {
      loginUser({
        id: response.data[0].id,
        name: response.data[0].name,
        email: response.data[0].email,
      });
      openAlert("Login Successful");
      setRedirect(true);
    } else alert("Incorrect email or password");
  };

  return (
    <PageTemplate>
      {redirect && <Navigate replace to="/" />}
      <div className="loginContainer">
        <div className="loginBox">
          <div className="loginTitle">Log in</div>
          <div className="loginEmailRow">
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="loginPasswordRow">
            <TextField
              required
              fullWidth
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="loginButtonRow">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Log in
            </Button>
          </div>
          <div className="loginSignupRow">
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
