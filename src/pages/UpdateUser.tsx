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
import { ChangeEvent, FormEvent, useState } from "react";
import { IRegisterValidation, UpdateUserT, UserT } from "../types/index.types";
import { Alert } from "@mui/material";
import GetContentService from "../services/GetContent.service";

const theme = createTheme();
type UpdateUserProp = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  handleUpdateUser: (value: boolean) => void;
};

const UpdateUser = ({ id, first_name, last_name, email, handleUpdateUser }: UpdateUserProp) => {
  const [updateErrorMessage, setUpdateErrorMessage] = useState<IRegisterValidation>({});
  const [formData, setFormData] = useState<UpdateUserT>({
    user_id: id,
    first_name: first_name,
    last_name: last_name,
    email: email,
  });

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    handleChange(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    if (name === "email") {
      const re = /\S+@\S+\.\S+/;

      if (!re.test(value)) {
        setUpdateErrorMessage((prev) => ({
          ...prev,
          [name]: "Invalid format for email",
        }));
      } else {
        if (updateErrorMessage.hasOwnProperty(name)) {
          const errMessage = updateErrorMessage;
          delete errMessage[name];
          setUpdateErrorMessage(errMessage);
        }

        const newArr: UpdateUserT = {
          ...formData,
          [name]: value,
        };
        setFormData(newArr);
      }
    } else if (name === "first_name") {
      const re = /^[A-Za-z]+$/;

      if (!re.test(value)) {
        setUpdateErrorMessage((prev) => ({
          ...prev,
          [name]: "Only Alphabet allowed for First Name",
        }));
      } else {
        if (updateErrorMessage.hasOwnProperty(name)) {
          const errMessage = updateErrorMessage;
          delete errMessage[name];
          setUpdateErrorMessage(errMessage);
        }

        const newArr: UpdateUserT = {
          ...formData,
          [name]: value,
        };
        setFormData(newArr);
      }
    } else if (name === "last_name") {
      const re = /^[A-Za-z]+$/;
      if (!re.test(value)) {
        setUpdateErrorMessage((prev) => ({
          ...prev,
          [name]: "Only Alphabet allowed for Last Name",
        }));
      } else {
        if (updateErrorMessage.hasOwnProperty(name)) {
          const errMessage = updateErrorMessage;
          delete errMessage[name];
          setUpdateErrorMessage(errMessage);
        }

        const newArr: UpdateUserT = {
          ...formData,
          [name]: value,
        };
        setFormData(newArr);
      }
    }
  };

  const registerHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (updateErrorMessage && formData.email !== "") {
      const response = GetContentService.updateUser(formData);

      response
        .then((res) => {
          if (res.message) {
            handleUpdateUser(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
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
              Update User
            </Typography>
            <Box
              component='form'
              noValidate
              sx={{ mt: 1 }}
              data-testid='update-form'
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => registerHandle(e)}
            >
              {updateErrorMessage.hasOwnProperty("firs_name") && (
                <>
                  <Alert severity='error'>{updateErrorMessage.first_name}</Alert>
                </>
              )}
              <TextField
                margin='normal'
                required
                fullWidth
                id='first_name'
                label='First Name'
                name='first_name'
                value={formData.first_name}
                autoComplete='first_name'
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
              />
              {updateErrorMessage.hasOwnProperty("last_name") && (
                <>
                  <Alert severity='error'>{updateErrorMessage.last_name}</Alert>
                </>
              )}
              <TextField
                margin='normal'
                required
                fullWidth
                id='last_name'
                label='Last Name'
                name='last_name'
                value={formData.last_name}
                autoComplete='last_name'
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
              />
              {updateErrorMessage.hasOwnProperty("email") && (
                <>
                  <Alert severity='error'>{updateErrorMessage.email}</Alert>
                </>
              )}
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                value={formData.email}
                autoComplete='email'
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
              />
              {updateErrorMessage.hasOwnProperty("password") && (
                <>
                  <Alert severity='error'>{updateErrorMessage.password}</Alert>
                </>
              )}
              <Button disabled={!updateErrorMessage} fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} type='submit'>
                Update
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default UpdateUser;
