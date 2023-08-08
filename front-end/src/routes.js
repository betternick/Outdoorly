import { DECREASING } from "./redux/ParkSearchInfo/ParkSearchInfo.slice";

export const PAGE_SIZE = 6;

export function getRoutes() {
  return {
    home: "/",
    searchResults: "/search-results",
    parkDetails: "/park-details/:id",
    login: "/login",
    callback: "/callback",
  };
}

export const PARKS_API_BASE_ROUTE = "https://developer.nps.gov/api/v1/";
export const PARKS_API_KEY = "tpKlhub2fE3bdPbvzHdMthRnjLj560SE0eLaBUKZ";
export const APP_API_BASE_ROUTE = process.env.REACT_APP_BASE_URL;

export function getProximitySearchRoute(city, state, radius, sortDir, page) {
  return `${APP_API_BASE_ROUTE}/parks/distance?city=${city}&state=${state}&radius=${radius}${
    sortDir === DECREASING ? "&sortBy=desc" : ""
  }&page=${page}&size=${PAGE_SIZE}`;
}

export function getSearchByPreferencesSearchRoute(
  state,
  activities,
  amenities,
  sort,
  page
) {
  return `${APP_API_BASE_ROUTE}/parks/?state=${state}${activities}${amenities}${sort}&page=${page}&size=${PAGE_SIZE}`;
}

export function getAppParkDetailsRoute(id) {
  return `${APP_API_BASE_ROUTE}/parks/${id}`;
}

export function getReviewRoute(id, page) {
  return `${APP_API_BASE_ROUTE}/parks/review/${id}`;
}

export function getImageRoute(id) {
  return `${APP_API_BASE_ROUTE}/parks/images/${id}`;
}
export function getAuthURLRoute() {
  return `${APP_API_BASE_ROUTE}/auth/google`;
}

export function getAuthCallBackRoute(code) {
  return `${APP_API_BASE_ROUTE}/auth/google/callback?code=${code}`;
}

export function getLogoutRoute() {
  return `${APP_API_BASE_ROUTE}/auth/google/logout`;
}

// national parks API

export function getParkDetailsRoute(parkCode) {
  return `${PARKS_API_BASE_ROUTE}parks?parkCode=${parkCode}&api_key=${PARKS_API_KEY}`;
}

export function getAmenitiesRoute() {
  return `${PARKS_API_BASE_ROUTE}amenities?api_key=${PARKS_API_KEY}`;
}

export function getActivitiesRoute() {
  return `${PARKS_API_BASE_ROUTE}activities?api_key=${PARKS_API_KEY}`;
}

export function getActivitiesSearchRoute(ids) {
  return `${PARKS_API_BASE_ROUTE}activities/parks?id=${ids}&api_key=${PARKS_API_KEY}`;
}
