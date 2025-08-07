import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

import { IFormData } from "../types/index.types";
import AuthenticationService from "../services/Authentication.service";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const theme = createTheme();
const Login = () => {
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { verifyUser, isVerified } = useAuthContext();

  useEffect(() => {
    if (isVerified) {
      navigate("/", { replace: true });
    }
  }, [isVerified, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    const newArr: IFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newArr);
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    if (name === "email") {
      const re = /\S+@\S+\.\S+/;
      !re.test(value) ? setLoginErrorMessage("Invalid format for email") : setLoginErrorMessage("");
    } else if (name === "password") {
      value.length >= 8
        ? setLoginErrorMessage("")
        : setLoginErrorMessage("Password should be more than 8 Character long");
    }
  };

  const loginHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginErrorMessage === "") {
      const response = AuthenticationService.authenticate(formData);
      response
        .then((res) => {
          if (res.non_field_errors) {
            setLoginErrorMessage("Invalid Username or Password");
            return;
          }
          const { refresh, access } = res;
          if (refresh && access) {
            Cookies.set("jwt", access, { expires: 7 });
            Cookies.set("jwt_refresh", refresh, { expires: 7 });
            verifyUser();
            navigate("/");
          }
        })
        .catch((err) => {
          setLoginErrorMessage(err.message);
        });
    }
  };

  return (
    <>
      {isVerified ? (
        <p>Loading</p>
      ) : (
        <ThemeProvider theme={theme}>
          <Grid container component='main' sx={{ height: "100vh" }}>
            <CssBaseline />

            <Grid component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                  Sign in
                </Typography>
                <Box
                  component='form'
                  noValidate
                  sx={{ mt: 1 }}
                  data-testid='signin-form'
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => loginHandle(e)}
                >
                  {loginErrorMessage && (
                    <>
                      <Alert severity='error'>{loginErrorMessage}</Alert>
                    </>
                  )}
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleBlur(e)}
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    inputProps={{ "data-testid": "password" }}
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleBlur(e)}
                  />
                  <Button
                    disabled={loginErrorMessage !== ""}
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                    type='submit'
                    data-testid='signInBtn'
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid>
                      <Button onClick={() => navigate("/register")}>Dont have an account? Sign Up</Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
};

export default Login;
