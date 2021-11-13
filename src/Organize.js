import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Paper,
  ButtonBase,
  CardHeader,
  Collapse,
  Avatar,
  IconButton,
  Box
} from "@material-ui/core";
import { textOverflow, overflow} from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  grid: {
      width: '400px',
  height: '100px'
  }
}));

export default function GetOrganized() {
      const classes = useStyles();

    return (
      
      <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} >
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src= "/dogimg.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="title1">
                   article summary
                </Typography>
                
                <Typography variant="body2" color="textSecondary">
                  link to article
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button size="small" style={{ color: '#af4448' }}>
            SHARE
          </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
