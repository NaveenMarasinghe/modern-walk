import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserAPI } from "src/services/user.services";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../../sections/pageTemplate/PageTemplate";

const theme = createTheme();

type UserData = {
  name: string;
  email: string;
  password: string;
};

export default function Login() {
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [repeatPassword, setRepeatPassword] = React.useState<string>("");
  const [redirect, setRedirect] = React.useState<boolean>(false);

  // const validateEmail = async (email: string): Promise<boolean> => {
  //   const res: UserData = await UserAPI.email(email)
  //     .then(function (response) {
  //       console.log(response);
  //       alert("Successfully singed up.");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   // const data = await res.json();
  //   if (!res[0]) {
  //     return true;
  //   } else {
  //     alert("Email already exists");
  //     return false;
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData: UserData = {
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

  let navigate = useNavigate();

  React.useEffect(() => {
    if (redirect) {
      navigate("/login");
    }
  }, [redirect]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Log in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
