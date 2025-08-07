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
import { ISignUp, IRegisterValidation } from "../types/index.types";
import AuthenticationService from "../services/Authentication.service";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const theme = createTheme();
const Register = () => {
  const [registerErrorMessage, setRegisterErrorMessage] = useState<IRegisterValidation>({});
  const [formData, setFormData] = useState<ISignUp>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const { verifyUser, isVerified } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isVerified) {
      navigate("/", { replace: true });
    }
  }, [isVerified, navigate]);

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    handleChange(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    if (name === "email") {
      const re = /\S+@\S+\.\S+/;

      if (!re.test(value)) {
        setRegisterErrorMessage((prev) => ({
          ...prev,
          [name]: "Invalid format for email",
        }));
      } else {
        if (registerErrorMessage.hasOwnProperty(name)) {
          const errMessage = registerErrorMessage;
          delete errMessage[name];
          setRegisterErrorMessage(errMessage);
        }

        const newArr: ISignUp = {
          ...formData,
          [name]: value,
        };
        setFormData(newArr);
      }
    } else if (name === "password") {
      if (value.length < 8) {
        setRegisterErrorMessage((prev) => ({
          ...prev,
          [name]: "Password should be more than 8 Character long",
        }));
      } else {
        if (registerErrorMessage.hasOwnProperty(name)) {
          const errMessage = registerErrorMessage;
          delete errMessage[name];
          setRegisterErrorMessage(errMessage);
        }

        const newArr: ISignUp = {
          ...formData,
          [name]: value,
        };
        setFormData(newArr);
      }
    } else if (name === "first_name") {
      const re = /^[A-Za-z]+$/;

      if (!re.test(value)) {
        setRegisterErrorMessage((prev) => ({
          ...prev,
          [name]: "Only Alphabet allowed for First Name",
        }));
      } else {
        if (registerErrorMessage.hasOwnProperty(name)) {
          const errMessage = registerErrorMessage;
          delete errMessage[name];
          setRegisterErrorMessage(errMessage);
        }

        const newArr: ISignUp = {
          ...formData,
          [name]: value,
        };
        setFormData(newArr);
      }
    } else if (name === "last_name") {
      const re = /^[A-Za-z]+$/;
      if (!re.test(value)) {
        setRegisterErrorMessage((prev) => ({
          ...prev,
          [name]: "Only Alphabet allowed for Last Name",
        }));
      } else {
        if (registerErrorMessage.hasOwnProperty(name)) {
          const errMessage = registerErrorMessage;
          delete errMessage[name];
          setRegisterErrorMessage(errMessage);
        }

        const newArr: ISignUp = {
          ...formData,
          [name]: value,
        };
        setFormData(newArr);
      }
    } else if (name === "confirm_password") {
      if (value !== formData.password) {
        setRegisterErrorMessage((prev) => ({
          ...prev,
          [name]: "Password and Confirm Password should match",
        }));
        console.log(registerErrorMessage);
      } else {
        if (registerErrorMessage.hasOwnProperty(name)) {
          const errMessage = registerErrorMessage;
          delete errMessage[name];
          setRegisterErrorMessage(errMessage);
        }
      }
    }
  };

  const registerHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registerErrorMessage && formData.email !== "") {
      const response = AuthenticationService.register(formData);

      response
        .then((res) => {
          if (res.tokens) {
            const { refresh, access } = res.tokens;

            Cookies.set("jwt", access, { expires: 7 });
            Cookies.set("jwt_referesh", refresh, { expires: 7 });
            verifyUser();
            navigate("/");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div>
      {isVerified ? (
        <p>Loading</p>
      ) : (
        <ThemeProvider theme={theme}>
          <Grid
            container
            component='main'
            sx={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
                  Register
                </Typography>
                <Box
                  component='form'
                  noValidate
                  sx={{ mt: 1 }}
                  data-testid='register-form'
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => registerHandle(e)}
                >
                  {registerErrorMessage.hasOwnProperty("first_name") && (
                    <>
                      <Alert severity='error'>{registerErrorMessage.first_name}</Alert>
                    </>
                  )}
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='first_name'
                    label='First Name'
                    name='first_name'
                    autoComplete='first_name'
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleBlur(e)}
                  />
                  {registerErrorMessage.hasOwnProperty("last_name") && (
                    <>
                      <Alert severity='error'>{registerErrorMessage.last_name}</Alert>
                    </>
                  )}
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='last_name'
                    label='Last Name'
                    name='last_name'
                    autoComplete='last_name'
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleBlur(e)}
                  />
                  {registerErrorMessage.hasOwnProperty("email") && (
                    <>
                      <Alert severity='error'>{registerErrorMessage.email}</Alert>
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
                  {registerErrorMessage.hasOwnProperty("password") && (
                    <>
                      <Alert severity='error'>{registerErrorMessage.password}</Alert>
                    </>
                  )}
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
                  {registerErrorMessage.hasOwnProperty("confirm_password") && (
                    <>
                      <Alert severity='error'>{registerErrorMessage.confirm_password}</Alert>
                    </>
                  )}
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    inputProps={{ "data-testid": "confirm_password" }}
                    name='confirm_password'
                    label='Confirm Password'
                    type='password'
                    id='confirm_password'
                    // autoComplete='current-password'
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleBlur(e)}
                  />
                  <Button
                    disabled={!registerErrorMessage}
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                    type='submit'
                  >
                    Sign Up
                  </Button>
                  <Grid container>
                    <Grid>
                      <Button onClick={() => navigate("/login")}>Already Have an Account? Login</Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </div>
  );
};

export default Register;
