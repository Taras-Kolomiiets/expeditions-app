import axios from "axios";
import { setPhotosAction } from "../redux/reducers/state-reducer";
import { Loading } from "notiflix";

const API_KEY = "r2pmpdHRfs3N87ifzV0cLE3j7IX3Oo5SBpJGfYPw";

const instance = axios.create({
  baseURL: "https://api.nasa.gov/mars-photos/api/v1/rovers/",
});

export const getPhotos = async (
  rover = "",
  sol = 1000,
  camera = "all",
  page = 1
) => {
  const response = await instance.get(
    `${rover}/photos?&sol=${sol}&camera=${camera}&page=${page}&per_page=6&api_key=${API_KEY}`
  );
  const data = await response.data;
  return data;
};

export const fetchPhotos = (rover, sol, camera, page) => async (dispatch) => {
  Loading.dots();
  const photos = await getPhotos(rover, sol, camera, page);
  dispatch(setPhotosAction(photos));
  Loading.remove();
};
