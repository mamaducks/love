import React from "react";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid,
  IconButton,
  Typography
} from "@material-ui/core";
import { MdWeb } from "react-icons/md";

const useStyles = ({ isForSearch }) =>
  makeStyles(theme => ({
    root: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(1),
      margin: 9,
      height: isForSearch ? 230 : 303,
      width: 370,
      color: "#006978",
      justifyContent: "space-between",
      boxSizing: 'border-box',
    margin: '10px 10px 20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    webkitBoxShadow: '0 1px 0 rgb(0 0 0 / 15%)',
    boxShadow: '0 1px 0 rgb(0 0 0 / 15%)',
    },
    media: {
      height: 140
    },
    topBox: {
      display: "flex",
      paddingTop: 5,
      paddingBottom: 0,
      marginBottom: 0,
      flex: "1 0 auto",
      flexDirection: "column"
    },
    button: {
      "&:hover": {
        backgroundColor: "transparent"
      },
      paddingBottom: 3,
      paddingTop: 5,
      justifyContent: "center",
      flexDirection: "flex-end"
    }
  }));

const useSectionsStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 10,
    marginLeft: 20
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  header: {
    marginBottom: 20
  }
  
}));

export function Site({ imgUrl, title, summary, location, label, isForSearch }) {
  const classes = useStyles({ isForSearch })();

  return (
    <Card className={classes.root}>
      <CardActionArea target="_blank" href={location}>
        <CardMedia className={classes.media} image={`/${imgUrl}`} />

        <CardContent className={classes.topBox}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>

          {!isForSearch && (
            <Typography variant="body2" color="textSecondary" component="p">
              {summary}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>

      <CardActions className={classes.button}>
        
        <Button> 
          <Button
            size="small"
            color="secondary"
            target="_blank"
            label={label}
            href={location}
            className={classes.button} 
          >{label}
           </Button>
            <IconButton 
            className={classes.button} 
            color="primary"  
            component="span"
            >
          <MdWeb color="primary"  />
        </IconButton>
          </Button>
      </CardActions>
    </Card>
  );
}

export default function({ data, isForSearch }) {
  const classes = useSectionsStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4" color="textSecondary">
          Around the Web
        </Typography>
      </div>

      <Grid container spacing={1}>
        {data.map(reviewData => (
          <Site {...reviewData} isForSearch={isForSearch} />
        ))}
      </Grid>
    </div>
  );
}