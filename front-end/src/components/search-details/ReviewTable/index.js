import styles from "./review-table.module.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import { Rating } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "@mui/material";
import {
  deleteParkReview,
  retrieveParkReviews,
} from "../../../redux/ParkDetails/ParkDetails.thunks";
import { setPageNumber } from "../../../redux/ParkDetails/ParkDetails.slice";
import { hashToken } from "../../../services/park-service";

export function ReviewTable() {
  const parkName = useSelector((store) => store.parkDetails.details.fullName);
  const reviews = useSelector((store) => store.parkDetails.userReviews);
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  function handleDelete(userID) {
    dispatch(deleteParkReview(userID));
  }

  function checkReview(userID) {
    return user && userID === hashToken(user?.name + parkName);
  }

  return (
    <>
      <List className={styles.reviewsList}>
        <Divider variant="inset" component="li" />
        {reviews?.data &&
          reviews?.data.map((review, idx) => {
            return (
              <div key={review.id}>
                <ListItem className={styles.reviewsListItem}>
                  <ListItemAvatar>
                    <Avatar className={styles.reviewsAvatar}>
                      <NaturePeopleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <span className={styles.reviewBox}>
                        {checkReview(review.userID) && (
                          <span
                            onClick={() => {
                              handleDelete(review.userID);
                            }}
                            className={styles.reviewsDelete}
                          >
                            <Delete />
                          </span>
                        )}
                        {"   " + review.userName}
                      </span>
                    }
                    secondary={<p>{review.comment}</p>}
                  />
                  <Rating value={parseInt(review.experienceRating)} readOnly />
                </ListItem>

                {idx !== reviews.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </div>
            );
          })}
      </List>

      <div className={styles.pagination}>
        <Pagination
          count={reviews?.totalPages}
          onChange={(_, page) => {
            dispatch(setPageNumber(page));
            dispatch(retrieveParkReviews());
          }}
          color="primary"
        />
      </div>
    </>
  );
}
