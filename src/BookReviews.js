import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import ImportContactsIcon from "@material-ui/icons/ImportContacts";
// import Comments from "../Comments";
import {ImBook} from "react-icons/im";


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 345,
    height: 450,
    margin: 14,
    color: "#006978",
    boxSizing: 'border-box',
    margin: '10px 10px 20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    webkitBoxShadow: '0 1px 0 rgb(0 0 0 / 15%)',
    boxShadow: '0 1px 0 rgb(0 0 0 / 15%)'
  },

  paper: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "flex-end",
    boxSizing: "border-box",
    height: 320
  },

  media: {
    height: 175,
    width: "100%",
    marginTop: 2
  },

  topBox: {
    alignItems: "flex-start",
    paddingTop: 7,
    width: "100%",
    justifyContent: "flex-start"
  },

  title: {
    lineHeight: 1.2,
    marginTop: "0.8em",
    marginBottom: "0.2em",
    fontWeight: 400,
    fontSize: "1.1em",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",

    titleOverflow: {
      hover: {
        textOverflow: "clip",
        whiteSpace: "normal",
        wordBreak: "break-all"
      }
    }
  },

  author: {
    fontStyle: "italic",
    marginBottom: 11,
    fontSize: "small",
    paddingLeft: 12
  },

  summaryBox: {
    flexGrow: 1,
    maxHeight: 100,
    width: "100%",
    overflow: "hidden",
    margin: "-6px",
    paddingRight: 8
  },
  summary: {
    textIndent: "1em",
    padding: 5
  },

  button: {
    "&:hover": {
      backgroundColor: "transparent"
    },

    display: "flex",
    alignItems: "flex-end",
    flexDirection: "center",
    justifyContent: "space-between",
    alignContent: "flex-end",
    padding: 6
  }
}));

const useSectionsStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 10,
    marginLeft: 20,
    marginRight: 25,
    

  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  header: {
    color: "#08495d",
    marginBottom: 20

  }
}));

export function BookReview({ imgUrl, title, author, summary, location }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.paper}>
        <CardActionArea target="_blank" href={location} title={title}>
          <CardMedia className={classes.media} image={`/${imgUrl}`} />
          <Typography
            className={classes.title}
            variant="subtitle1"
            gutterBottom
            adjustFontSizeToFit
          >
            {title}
          </Typography>
          <Typography className={classes.author} variant="subtitle2">
            by {author}
          </Typography>{" "}
        </CardActionArea>

        <div className={classes.summaryBox}>
          <Typography
            className={classes.summary}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {summary}
          </Typography>
        </div>

        <CardActions>
          <Button>
            <Button
              color="secondary"
              target="_blank"
              href={location}
              className={classes.button}
            >
              View Book{" "}
            </Button>
            <IconButton
              className={classes.button}
              color="primary"
              component="span"
            >
              <ImBook color="primary" />
            </IconButton>
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}

export default function({ data, isForSearch }) {
  const classes = useSectionsStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4">
          Book Resources {isForSearch && ` - (${data.length}) Results`}
        </Typography>
      </div>

      <Grid container spacing={1}>
        {data.map(reviewData => (
          <BookReview {...reviewData} />
        ))}
      </Grid>
    </div>
  );
}