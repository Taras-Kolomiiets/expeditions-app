import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Button } from "@mui/material";
import { getPhotos } from "../../api/nasa-service";
import { setLoadMoreAction } from "../../redux/reducers/state-reducer";

const PhotosList = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.stateReducer.data.photos);
  const rover = useSelector((state) => state.stateReducer.rover);
  const camera = useSelector((state) => state.stateReducer.camera);
  const sol = useSelector((state) => state.stateReducer.sol);
  const page = useSelector((state) => state.stateReducer.page);

  const addNextPhotos = async () => {
    const nextPhotos = await getPhotos(rover, sol, camera, page + 1);
    return nextPhotos;
  };

  const onLoadMore = () => {
    addNextPhotos().then((data) => dispatch(setLoadMoreAction(data.photos)));
  };

  return (
    <>
      <ImageList sx={{ width: 800, height: 600 }}>
        <ImageListItem key="Subheader" cols={3}>
          <ListSubheader component="div">Photos</ListSubheader>
        </ImageListItem>
        {photos.map((item) => (
          <ImageListItem key={item.img_src}>
            <img
              src={`${item.img_src}?w=300&fit=crop&auto=format`}
              srcSet={`${item.img_src}?w=300&fit=crop&auto=format&dpr=2 2x`}
              alt=""
              loading="lazy"
            />
            <ImageListItemBar
              title={item.rover.name}
              subtitle={item.camera.name}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.rover.name}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      {}
      <Button onClick={onLoadMore} variant="contained" color="primary">
        Load more...
      </Button>
    </>
  );

  //
  //       <p>{el.sol}</p>
  //       <p>{el.earth_date}</p>
};

export default PhotosList;
