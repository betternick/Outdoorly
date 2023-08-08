import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getActivities,
  getParkDetails,
  getParksByPreferences,
  getParksByProximity,
} from "../../services/park-service";
import { Z_TO_A_SORTING } from "./ParkSearchInfo.slice";

export const fetchParkActivities = createAsyncThunk(
  "parkSearchInfo/fetchParkActivities",
  async () => {
    const activitiesRes = await getActivities();
    return activitiesRes.data;
  }
);

// appending an arbitrary number of params to our url
export const searchForParks = createAsyncThunk(
  "parkSearchInfo/searchForParks",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    let res;
    if (state.parkSearchInfo.searchMode === "PREFERENCES") {
      let sort =
        state.parkSearchInfo.sortDir === Z_TO_A_SORTING ? "&sortBy=desc" : "";
      res = await getParksByPreferences(
        state.parkSearchInfo.searchActivities
          .map((activity) => `&activities[]=${activity.label}`)
          .join(""),
        state.parkSearchInfo.searchStates.value,
        state.parkSearchInfo.searchAmenities
          .map((amenity) => `&amenities[]=${amenity.label}`)
          .join(""),
        sort,
        state.parkSearchInfo.currPage
      );
    } else {
      res = await getParksByProximity(
        state.parkSearchInfo.searchCity.split(", ")[0],
        state.parkSearchInfo.searchCity.split(", ")[1],
        state.parkSearchInfo.searchDistance,
        state.parkSearchInfo.distanceSortDir,
        state.parkSearchInfo.currPage
      );
    }
    return res.data;
  }
);

export const retrieveParkDetails = createAsyncThunk(
  "parkSearchInfo/retrieveParkDetails",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const res = await getParkDetails(state.parkSearchInfo.selectedParkID);
    return res.data;
  }
);
