import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { gapi } from "gapi-script";
import { useHistory } from "react-router-dom";

import { authGoogle, signIn, signUp } from "../../store/auth";


import Icon from "./Icon";

import { GoogleLogin } from "react-google-login";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Input from "./Input";

import useStyles from "./styles";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "563431563333-j8sqjqurkgp6d0ku9gcq4cf5dsrjsggt.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup){
      dispatch(signUp(formData, history))
    } else {
      dispatch(signIn(formData, history))
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const googleSucces = async (res) => {
    const result = res.profileObj;
    const token = res.tokenId;
    try {
      dispatch(authGoogle({ result, token }));
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sing Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="563431563333-j8sqjqurkgp6d0ku9gcq4cf5dsrjsggt.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disables={renderProps.disable}
                startIcon={<Icon />}
                variant="contained"
              >
                Sing In with Google
              </Button>
            )}
            onSuccess={googleSucces}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Alredy have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
