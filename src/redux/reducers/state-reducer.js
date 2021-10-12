const defaultState = {
  data: {
    photos: [],
  },
  loading: false,
  rover: "all",
  camera: "curiosity",
  sol: 1000,
  page: 1,
};

const SET_PHOTOS = "SET_PHOTOS";
const SET_LOADING = "SET_LOADING";
const SET_ROVER = "SET_ROVER";
const SET_CAMERA = "SET_CAMERA";
const SET_SOL = "SET_SOL";
const LOAD_MORE = "LOAD_MORE";

export const stateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PHOTOS:
      return {
        ...state,
        data: action.payload,
      };
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case SET_ROVER:
      return {
        ...state,
        rover: action.payload,
      };
    case SET_CAMERA:
      return {
        ...state,
        camera: action.payload,
      };
    case SET_SOL:
      return {
        ...state,
        sol: action.payload,
      };
    case LOAD_MORE:
      return {
        ...state,
        data: {
          photos: [...state.data.photos, ...action.payload],
        },
      };
    default:
      return state;
  }
};

export const setPhotosAction = (payload) => ({
  type: SET_PHOTOS,
  payload,
});
export const setLoadingAction = (payload) => ({
  type: SET_LOADING,
  payload,
});
export const setRoverAction = (payload) => ({
  type: SET_ROVER,
  payload,
});
export const setCameraAction = (payload) => ({
  type: SET_CAMERA,
  payload,
});
export const setSolAction = (payload) => ({
  type: SET_SOL,
  payload,
});
export const setLoadMoreAction = (payload) => ({
  type: LOAD_MORE,
  payload,
});
