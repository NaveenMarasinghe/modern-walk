import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { useUser } from "../../context/userContext";
import { useApp } from "../../context/appContext";
import { Navigate } from "react-router-dom";
import { UserAPI } from "../../services/user.services";
import PageTemplate from "../../sections/pageTemplate/PageTemplate";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./login.css";
import { CheckBox } from "@mui/icons-material";
import Input from "../../components/input/Input";

export default function Login() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [redirect, setRedirect] = React.useState<boolean>(false);
  const [checkboxStatus, setCheckboxStatus] = React.useState(null);
  const [loginError, setLoginError] = React.useState(0);
  const [pwInputType, setPwInputType] = React.useState<string>("password");
  const [rememberPw, setRememberPw] = React.useState(false);
  const [rememberedEmail, setRememberedEmail] = React.useState("");

  const { loginUser } = useUser();
  const { openAlert } = useApp();

  const handleSubmit = async () => {
    const response: any = await UserAPI.login(email, password);
    if (response.data[0]) {
      console.log(response);
      setLoginError(0);
      loginUser({
        id: response.data[0].id,
        name: response.data[0].name,
        email: response.data[0].email,
      });
      openAlert("Login Successful");
      if (rememberPw) {
        localStorage.setItem("mwemail", email);
      }
      setRedirect(true);
    } else {
      setLoginError(1);
    }
  };

  const toglePwInputType = () => {
    if (pwInputType === "password") {
      setPwInputType("text");
    } else {
      setPwInputType("password");
    }
  };

  React.useEffect(() => {
    const email = localStorage.getItem("mwemail");
    if (email) {
      setEmail(email);
    }
  });

  return (
    <>
      {redirect && <Navigate replace to="/" />}
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-[20%]">
          <div className="mb-[70px] text-5xl text-font-main font-bold text-center">
            Modern Walk
          </div>
          <div className="text-sm font-normal mb-1 flex">
            <div>Email address</div>
            <span className="text-primary">*</span>
          </div>
          <Input
            varient="primary"
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {loginError === 1 && (
            <div className="text-sm font-normal mb-1 flex text-danger-color">
              Please enter a valid email address
            </div>
          )}
          {loginError === 2 && (
            <div className="text-sm font-normal mb-1 flex text-danger-color">
              We couldn't find your account. Try again or contact your admin
            </div>
          )}
          <div className="text-sm font-normal mt-6 mb-1 flex">
            <div>Password</div>
            <span className="text-primary">*</span>
          </div>
          <div className="relative">
            <Input
              varient="primary"
              type={pwInputType}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-center items-center absolute right-[12px] top-3 ">
              {pwInputType === "password" && (
                <VisibilityOffIcon
                  className="hover:cursor-pointer"
                  onClick={toglePwInputType}
                />
              )}
              {pwInputType === "text" && (
                <VisibilityIcon
                  className="hover:cursor-pointer"
                  onClick={toglePwInputType}
                />
              )}
            </div>
          </div>
          {loginError === 3 && (
            <div className="text-sm font-normal mb-1 flex text-danger-color">
              Invalid password
            </div>
          )}
          <div className="text-primary mt-1 text-sm font-normal hover:cursor-pointer">
            Forgot password?
          </div>
          <div className="mt-8 flex justify-between">
            <div className="text-base flex items-center hover:cursor-pointer">
              {rememberPw ? (
                <CheckBoxIcon
                  className="text-primary hover:bg-primary-inverse-hover rounded-lg h-8 w-8 p-1"
                  onClick={() => setRememberPw(!rememberPw)}
                />
              ) : (
                <CheckBoxOutlineBlankIcon
                  className="text-font-main hover:text-primary hover:bg-primary-inverse-hover rounded-lg h-8 w-8 p-1"
                  onClick={() => setRememberPw(!rememberPw)}
                />
              )}
              <div className="ml-1">Remember me</div>
            </div>
            <div>
              <button
                type="submit"
                className="btn-2-primary hover:btn-2-primary-hover active:btn-2-primary-clicked"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </div>
          {/* <div className="loginEmailRow">
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
          </div> */}
          {/* <div className="loginSignupRow">
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
}
