import React, { useState, 
  // useEffect
 } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  // Icon,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";

import { authGoogle, signIn, signUp } from "../../store/auth";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Input from "./Input";

import useStyles from "./styles";

// import axios from "axios";
import jwt_decode from 'jwt-decode';

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
  const user = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      await dispatch(signUp(formData));
      if(user) history.go('/');
    } else {
      await dispatch(signIn(formData));
      if(user)
      history.go('/');
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

  const createOrGetUser = async (response) => {
    const { name, picture, email } = await jwt_decode(response.credential);
    dispatch(authGoogle({name,picture,email}));
    history.go('/');
}

  const onError = (error) => {
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
          <Button className={classes.googleButton} color='primary' fullWidth>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_PUBLIC_KEY}
            onSuccess={(credentialResponse) => {
              createOrGetUser(credentialResponse);
            }}
            onError={onError}
            />
           </Button>
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
