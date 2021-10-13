import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Input,
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import styles from "./Select.module.css";
import { getPhotos } from "../../api/nasa-service";
import {
  setCameraAction,
  setPhotosAction,
  setRoverAction,
  setSolAction,
} from "../../redux/reducers/state-reducer";
import Notiflix, { Notify, Loading } from "notiflix";

Notiflix.Notify.init({
  width: "350px",
  position: "right-bottom",
  opacity: 0.8,
  timeout: 3000,
  clickToClose: true,
  fontSize: "18px",
});

const SelectForm = () => {
  const dispatch = useDispatch();
  const rover = useSelector((state) => state.stateReducer.rover);
  const camera = useSelector((state) => state.stateReducer.camera);
  const sol = useSelector((state) => state.stateReducer.sol);

  const onButtonClick = () => {
    if (
      (rover === "Curiosity" && camera === "pancam") ||
      (rover === "Curiosity" && camera === "minites") ||
      (rover === "Opportunity" && camera === "mast") ||
      (rover === "Opportunity" && camera === "chemcam") ||
      (rover === "Opportunity" && camera === "mahli") ||
      (rover === "Opportunity" && camera === "mardi") ||
      (rover === "Spirit" && camera === "mast") ||
      (rover === "Spirit" && camera === "chemcam") ||
      (rover === "Spirit" && camera === "mahli") ||
      (rover === "Spirit" && camera === "mardi")
    ) {
      Notify.failure("We don't have such photos. Try another rover or camera.");
    } else if (rover === "all") {
      Notify.failure("Rover is required.");
    } else {
      Loading.dots();
      getPhotos(rover, sol, camera).then((data) => {
        if (data.photos.length === 0) {
          Notify.failure(
            "We don't have such photos. Try another rover or camera."
          );
        }
        dispatch(setPhotosAction(data));
      });
      Loading.remove();
    }
  };

  const onRoverChange = (e) => {
    dispatch(setRoverAction(e.target.value));
  };
  const onCameraChange = (e) => {
    dispatch(setCameraAction(e.target.value));
  };
  const onSolChange = (e) => {
    dispatch(setSolAction(e.target.value));
  };

  return (
    <>
      <h2 className={styles.subTitle}>Choose rover, camera and sol</h2>
      <div className={styles.wrapper}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Rover
            </InputLabel>
            <NativeSelect
              required={true}
              onChange={onRoverChange}
              inputProps={{
                name: "Rover",
                id: "uncontrolled-native",
              }}
            >
              <option value=""></option>
              <option value="Curiosity">Curiosity</option>
              <option value="Opportunity">Opportunity</option>
              <option value="Spirit">Spirit</option>
            </NativeSelect>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Camera
            </InputLabel>
            <NativeSelect
              onChange={onCameraChange}
              inputProps={{
                name: "Camera",
                id: "uncontrolled-native",
              }}
            >
              <option value=""></option>
              <option value="fhaz">FHAZ</option>
              <option value="rhaz">RHAZ</option>
              <option value="mast">MAST</option>
              <option value="chemcam">CHEMCAM</option>
              <option value="mahli">MAHLI</option>
              <option value="mardi">MARDI</option>
              <option value="navcam">NAVCAM</option>
              <option value="pancam">PANCAM</option>
              <option value="minites">MINITES</option>
            </NativeSelect>
          </FormControl>
        </Box>
        <Input
          required={true}
          type="number"
          placeholder="choose sol"
          onChange={onSolChange}
        />
        <Button
          size="normal"
          type="submit"
          variant="contained"
          color="primary"
          onClick={onButtonClick}
        >
          Show photos
        </Button>
      </div>
    </>
  );
};

export default SelectForm;
