import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import { TabPanel } from "../ParkDetailsTabPanel";
import ReviewsModal from "../Modal/ReviewsModal";
import PhotosModal from "../Modal/PhotosModal";
import styles from "./photos-and-reviews.module.scss";
import { ReviewTable } from "../ReviewTable";
import Photo from "./Photo";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveParkImages,
  retrieveParkReviews,
} from "../../../redux/ParkDetails/ParkDetails.thunks";
import {
  isInLocalStorage,
  USER_SESSION,
  INVALID_TOKEN,
} from "../../../session";
import { hashToken } from "../../../services/park-service";

export default function PhotosAndReviews() {
  const { parkCode } = useParams();
  const park = useSelector((store) => store.parkDetails);
  const [value, setValue] = useState(0);

  const [photoModal, setPhotoModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [showReviewsAlert, setReviewsAlert] = useState(false);
  const [showPhotosAlert, setPhotosAlert] = useState(false);
  const [reviewed, setReviewed] = useState({});
  const [images, setImages] = useState([]);
  const [sessionToken, setToken] = useState(INVALID_TOKEN);
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setReviewed(
      park?.userReviews?.data.reduce((acc, curr) => {
        return curr.userID === hashToken(user?.name + park.details.fullName)
          ? curr
          : acc;
      }, {})
    );
  }, [park, user]);

  useEffect(() => {}, [reviewed]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setImages(park?.details.images.concat(park.userImages));
  }, [park.userImages, park.details]);

  useEffect(() => {
    if (isInLocalStorage(USER_SESSION))
      setToken(localStorage.getItem(USER_SESSION));
  }, []);

  useEffect(() => {
    if (park.details) {
      dispatch(retrieveParkReviews(parkCode));
      dispatch(retrieveParkImages(park.details["_id"]));
    }
  }, []);

  useEffect(() => {
    if (showReviewsAlert) {
      setTimeout(() => {
        setReviewsAlert(false);
      }, 4000);
    }
  }, [showReviewsAlert]);

  useEffect(() => {
    if (showPhotosAlert) {
      setTimeout(() => {
        setPhotosAlert(false);
      }, 4000);
    }
  }, [showPhotosAlert]);

  if (!park.details) {
    return <div>loading...</div>;
  }

  return (
    <div className={styles.photosAndReviewsWrapper}>
      <Tabs
        value={value}
        style={{ display: "flex", justifyContent: "center" }}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Reviews" />
        <Tab label="Photos" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <div className={styles.addReviewButton}>
          {sessionToken === INVALID_TOKEN ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Button
                variant="outlined"
                disabled
                style={{
                  marginBottom: "5%",
                  marginTop: "3%",
                }}
              >
                Add a review
              </Button>
              <Typography color="secondary"> Login to Add a Review </Typography>
            </div>
          ) : (
            <Button variant="outlined" onClick={() => setReviewModal(true)}>
              {Object.keys(reviewed || {}).length !== 0
                ? `Edit Review`
                : `Add Review`}
            </Button>
          )}
        </div>
        {showReviewsAlert && (
          <Alert
            className={styles.submitAlert}
            severity="success"
            maxWidth={false}
            variant="filled"
            sx={{ mb: 2 }}
          >
            Review added successfully
          </Alert>
        )}
        <ReviewTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={styles.addPhotoButton}>
          {sessionToken === INVALID_TOKEN ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Button
                variant="outlined"
                disabled
                style={{
                  marginBottom: "5%",
                  marginTop: "3%",
                }}
              >
                Add Photo
              </Button>
              <Typography color="secondary"> Login to Add a Photo</Typography>
            </div>
          ) : (
            <Button variant="outlined" onClick={() => setPhotoModal(true)}>
              Add photo
            </Button>
          )}
        </div>
        {showPhotosAlert && (
          <Alert
            className={styles.submitAlert}
            severity="success"
            maxWidth={false}
            variant="filled"
            sx={{ mb: 2 }}
          >
            Photo added successfully
          </Alert>
        )}
        <div className={styles.parkImagesContainer}>
          {images.map((imgDetails, i) => {
            if (i === images.length - 1) {
              return (
                <Photo
                  key={i}
                  url={imgDetails?.url}
                  likes={imgDetails.favouritedCount}
                  className={styles.lastImg}
                />
              );
            } else {
              return <Photo key={i} url={imgDetails.url} />;
            }
          })}
        </div>
      </TabPanel>
      {reviewModal && (
        <ReviewsModal
          sessionToken={sessionToken}
          setVisible={setReviewModal}
          setAlert={setReviewsAlert}
          parkName={park.details.fullName}
          reviewed={reviewed}
          setReviewed={setReviewed}
        />
      )}
      {photoModal && (
        <PhotosModal
          sessionToken={sessionToken}
          setVisible={setPhotoModal}
          setAlert={setPhotosAlert}
        />
      )}
    </div>
  );
}
