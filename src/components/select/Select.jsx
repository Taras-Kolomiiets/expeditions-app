import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, MenuItem, Select } from "@mui/material";
import styles from "./Select.module.css";
import { fetchPhotos } from "../../api/nasa-service";
import {
  setCameraAction,
  setRoverAction,
  setSolAction,
} from "../../redux/reducers/state-reducer";

const SelectForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const rover = useSelector((state) => state.stateReducer.rover);
  const camera = useSelector((state) => state.stateReducer.camera);
  const sol = useSelector((state) => state.stateReducer.sol);

  const onClick = () => {
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
      setError("we don't have such photos. Try another rover or camera.");
    } else if (!rover) {
      setError("rover is required");
    } else {
      dispatch(fetchPhotos(rover, sol, camera));
    }
  };
  const onRoverChange = (e) => {
    setError("");
    dispatch(setRoverAction(e.target.value));
  };
  const onCameraChange = (e) => {
    setError("");
    dispatch(setCameraAction(e.target.value));
  };
  const onSolChange = (e) => {
    setError("");
    dispatch(setSolAction(e.target.value));
  };

  return (
    <>
      <h2>Choose rover, camera and sol. Rover is required</h2>
      <Select
        name="choose your rover"
        label="rover"
        onChange={onRoverChange}
        className={styles.roverField}
      >
        <MenuItem value="Curiosity">Curiosity</MenuItem>
        <MenuItem value="Opportunity">Opportunity</MenuItem>
        <MenuItem value="Spirit">Spirit</MenuItem>
      </Select>
      <Select
        name="choose your camera"
        onChange={onCameraChange}
        className={styles.cameraField}
      >
        <MenuItem value="fhaz">fhaz</MenuItem>
        <MenuItem value="rhaz">rhaz</MenuItem>
        <MenuItem value="mast">mast</MenuItem>
        <MenuItem value="chemcam">chemcam</MenuItem>
        <MenuItem value="mahli">mahli</MenuItem>
        <MenuItem value="mardi">mardi</MenuItem>
        <MenuItem value="navcam">navcam</MenuItem>
        <MenuItem value="pancam">pancam</MenuItem>
        <MenuItem value="minites">minites</MenuItem>
      </Select>
      <Input type="text" placeholder="choose sol" onChange={onSolChange} />
      {error && <span className={"error"}>{error}</span>}
      <Button color="primary" onClick={onClick}>
        Show photos
      </Button>
    </>
  );
};

export default SelectForm;
