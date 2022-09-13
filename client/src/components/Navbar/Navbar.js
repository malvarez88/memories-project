import React, { 
  // useState, 
  useEffect } from "react";
import { AppBar, Button, Typography, Toolbar, Avatar } from "@material-ui/core";
import { Link, useHistory, 
  // useLocation
 } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/auth";

const Navbar = () => {
  const classes = useStyles();
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  // const location = useLocation(); 
  const user = useSelector(state => state.auth)
  
  useEffect(() => {
      const token = user && user.token;
      if(user.name)
      history.push('/');
    }, [user]); //Check this!!!
    
    const logedOut = () => {
        dispatch(logOut({user}))
        history.push('/'); 
    };
    
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Posts
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user.name ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.name}
              src={user.picture}
            ></Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logedOut}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
