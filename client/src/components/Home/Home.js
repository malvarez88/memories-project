import React, { useEffect, useState } from "react";

import { Container, Grow, Grid, Paper } from "@material-ui/core";

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from "../Pagination/Pagination";

import { useDispatch } from "react-redux";
import { getPost } from '../../store/posts';

import useStyles from "../../styles";

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getPost());
    }, [currentId, dispatch]);
    
  return (
    <Grow in>
        <Container>
          <Grid
            className={classes.mainContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper className={classes.pagination} elevation={6} >
                <Pagination />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home