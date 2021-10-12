import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, MenuItem, Select } from "@mui/material";
import styles from "./Select.module.css";
import { fetchPhotos } from "../../api/nasa-service";
import {
  setCameraAction,
  setRoverAction,
  setSolAction,
} from "../../redux/reducers/state-reducer";
import Notiflix, { Notify } from "notiflix";

Notiflix.Notify.init({
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

  const onClick = () => {
    console.log(rover);
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
      dispatch(fetchPhotos(rover, sol, camera));
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
        <Select
          className={styles.field}
          name="choose your rover"
          label="rover"
          value={rover}
          onChange={onRoverChange}
        >
          <MenuItem value="Curiosity">Curiosity</MenuItem>
          <MenuItem value="Opportunity">Opportunity</MenuItem>
          <MenuItem value="Spirit">Spirit</MenuItem>
        </Select>
        <Select
          required={true}
          name="choose your camera"
          value={camera}
          onChange={onCameraChange}
          className={styles.field}
        >
          <MenuItem value="fhaz">FHAZ</MenuItem>
          <MenuItem value="rhaz">RHAZ</MenuItem>
          <MenuItem value="mast">MAST</MenuItem>
          <MenuItem value="chemcam">CHEMCAM</MenuItem>
          <MenuItem value="mahli">MAHLI</MenuItem>
          <MenuItem value="mardi">MARDI</MenuItem>
          <MenuItem value="navcam">NAVCAM</MenuItem>
          <MenuItem value="pancam">PANCAM</MenuItem>
          <MenuItem value="minites">MINITES</MenuItem>
        </Select>
        <Input
          className={styles.field}
          required={true}
          type="number"
          placeholder="choose sol"
          onChange={onSolChange}
        />
        <Button
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          onClick={onClick}
        >
          Show photos
        </Button>
      </div>
    </>
  );
};

export default SelectForm;
