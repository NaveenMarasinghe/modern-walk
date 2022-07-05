import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { UserAPI } from "src/services/user.services";
import { Navigate } from "react-router-dom";
import PageTemplate from "../../sections/pageTemplate/PageTemplate";
import "./signup.css";

type NewUser = {
  name: string;
  email: string;
  password: string;
};

export default function Signup() {
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [repeatPassword, setRepeatPassword] = React.useState<string>("");
  const [redirect, setRedirect] = React.useState<boolean>(false);

  const handleSubmit = async () => {
    const userData: NewUser = {
      name: name,
      email: email,
      password: password,
    };
    if (password === repeatPassword) {
      const response: any = await UserAPI.signup(userData);
      if (response.data) {
        alert("New account created");
        setRedirect(true);
      } else if (response.error) {
        console.log(response.error);
      }
    } else {
      alert("Password does not match");
    }
  };

  return (
    <PageTemplate>
      {redirect && <Navigate replace to="/login" />}
      <div className="signupContainer">
        <div className="signupBox">
          <div className="signupTitle">Sign up</div>
          <div className="signupTextRow">
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="signupTextRow">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signupTextRow">
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="signupTextRow">
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordAgian"
              label="Repeat Password"
              type="password"
              id="repeatPassword"
              autoComplete="repeat-password"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div className="signupButtonRow">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign up
            </Button>
          </div>
          <div className="signupSignupRow">
            <Link href="/login" variant="body2">
              {"Already have an account? Log in"}
            </Link>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
