import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Share, ExpandMore } from "@material-ui/icons";
import clsx from "clsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NewsData from "./NewsObject";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      maxHeight: 580,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  })
);

export default function NewsItem(NewsData: NewsData) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={NewsData.title} />
      <CardMedia
        className={classes.media}
        image={NewsData.urlToImage}
        title={NewsData.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {NewsData.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, { [classes.expandOpen]: expanded })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{NewsData.content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
