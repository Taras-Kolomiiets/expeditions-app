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
import TransitionsModal from "../Modal/Modal";
import Notiflix, { Notify, Loading } from "notiflix";

Notiflix.Notify.init({
  position: "right-bottom",
  opacity: 0.8,
  timeout: 3000,
  clickToClose: true,
  fontSize: "18px",
});

const useStyles = makeStyles({
  root: {
    maxWidth: 460,
    margin: "0 auto",
  },
  wrapper: {
    marginTop: 20,
  },
  media: {
    height: 240,
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
      .then((data) => {
        if (data.photos.length > 0) {
          Loading.dots();
          dispatch(setLoadMoreAction(data.photos));
          Loading.remove();
        }
        Notify.failure("Oops. No photo left.");
      })
      .then(setPage(page + 1));
  };

  const classes = useStyles();

  return (
    <div>
      <Grid container justify="center" spacing={2} className={classes.wrapper}>
        {photos.map((item, i) => (
          <Grid key={i} item xs={8} md={4} sm={8} className={classes.root}>
            <Card>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={item.img_src}
                  title="Image Mars"
                />
                <CardContent>
                  <Typography variant="h5" color="textPrimary">
                    Earth date:
                  </Typography>
                  <Typography variant="h6" component="h2" color="textSecondary">
                    {item.earth_date}
                  </Typography>
                  <Divider />
                  <Typography variant="body1" color="textPrimary">
                    Rover name:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.rover.name}
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
                <TransitionsModal image={item.img_src} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {photos.length > 0 && (
        <Button
          style={{ margin: "20px auto" }}
          onClick={onLoadMore}
          variant="contained"
          color="primary"
        >
          Load more...
        </Button>
      )}
    </div>
  );
};

export default PhotosList;
