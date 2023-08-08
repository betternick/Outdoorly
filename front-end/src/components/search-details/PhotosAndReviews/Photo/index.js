import styles from "./photos.module.scss";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Photo(props) {
  return (
    <div className={styles.photoContainer}>
      <img alt={"Park"} src={props.url} className={styles.photoImage} />
    </div>
  );
}
