import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { UserAPI } from "src/services/user.services";
import { Navigate } from "react-router-dom";
import PageTemplate from "../../sections/pageTemplate/PageTemplate";
import Input from "../../components/input/Input";
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
    <>
      {redirect && <Navigate replace to="/login" />}
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-[20%]">
          <div className="mb-[70px] text-5xl text-font-main font-bold text-center">
            Modern Walk
          </div>
          <div className="signupTextRow">
            <div className="text-sm font-normal my-1 flex">
              <div>Name</div>
              <span className="text-primary">*</span>
            </div>
            <Input
              type="text"
              varient="primary"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="signupTextRow">
            <div className="text-sm font-normal my-1 flex">
              <div>Email address</div>
              <span className="text-primary">*</span>
            </div>
            <Input
              type="text"
              varient="primary"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signupTextRow">
            <div className="text-sm font-normal my-1 flex">
              <div>Password</div>
              <span className="text-primary">*</span>
            </div>
            <Input
              type="text"
              varient="primary"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="signupTextRow">
            <div className="text-sm font-normal my-1 flex">
              <div>Repeat password</div>
              <span className="text-primary">*</span>
            </div>
            <Input
              type="text"
              varient="primary"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div className="signupButtonRow text-center my-2">
            <button
              type="submit"
              className="btn-2-primary hover:btn-2-primary-hover active:btn-2-primary-clicked"
              onClick={handleSubmit}
            >
              Sign up
            </button>
          </div>
          <div className="signupSignupRow">
            <Link href="/login" variant="body2">
              {"Already have an account? Log in"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
