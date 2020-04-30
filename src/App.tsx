import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import axios from "axios";
import "./App.css";
import { NewsResponse } from "./NewsQuery";
import NewsItem from "./NewsItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuBar: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      padding: "0 30px",
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function App() {
  const classes = useStyles();

  const [data, setData] = useState<NewsResponse>();
  const [refreshNews, setRefreshNews] = useState(0);

  useEffect(() => {
    axios
      .get<NewsResponse>(
        "http://newsapi.org/v2/everything?" +
          "q=covid&" +
          "sortBy=popularity&" +
          "apiKey=<INSERT NEWSAPI API KEY HERE>"
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [refreshNews]);

  return (
    <div className="App">
      <AppBar position="static" className={classes.menuBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              setRefreshNews(refreshNews + 1);
              console.log(refreshNews);
            }}
          >
            <RefreshIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            COVID News
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.root} spacing={2}>
        {data?.articles.map((NewsData) => (
          <Grid item xs={3}>
            <NewsItem {...NewsData}></NewsItem>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
