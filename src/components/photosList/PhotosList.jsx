import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Divider,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { getPhotos } from "../../api/nasa-service";
import { setLoadMoreAction } from "../../redux/reducers/state-reducer";
import styles from "./PhotosList.module.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 460,
  },
  wrapper: {
    marginTop: 20,
  },
  media: {
    height: 180,
  },
});

const PhotosList = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.stateReducer.data.photos);
  const rover = useSelector((state) => state.stateReducer.rover);
  const camera = useSelector((state) => state.stateReducer.camera);
  const sol = useSelector((state) => state.stateReducer.sol);

  const [page, setPage] = useState(2);

  const onLoadMore = () => {
    getPhotos(rover, sol, camera, page)
      .then((data) => dispatch(setLoadMoreAction(data.photos)))
      .then(setPage(page + 1));
  };

  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={3} className={classes.wrapper}>
      {photos.map((item, i) => (
        <Grid key={i} item xs={12} md={4} sm={6} className={classes.root}>
          <Card>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={item.img_src}
                title="Image Mars"
              />
              <CardContent>
                <Typography variant="h5" color="textPrimary">
                  Rover name:
                </Typography>
                <Typography variant="h6" component="h2" color="textSecondary">
                  {item.rover.name}
                </Typography>
                <Divider />
                <Typography variant="body1" color="textPrimary">
                  Camera name:
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.camera.full_name}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  Sol:{" "}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    {item.sol}
                  </Typography>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href={item.img_src}
                target="_blank"
              >
                open photo
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Button
        style={{ marginLeft: "auto", marginRight: "auto" }}
        onClick={onLoadMore}
        variant="contained"
        color="primary"
      >
        Load more...
      </Button>
    </Grid>
  );
};

export default PhotosList;
