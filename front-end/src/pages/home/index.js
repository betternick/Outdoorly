import styles from "./home.module.scss";
import SearchForm from "../../components/search/SearchForm";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearSearchResults } from "../../redux/ParkSearchInfo/ParkSearchInfo.slice";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearSearchResults());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.home}>
      <div className={styles.title}>
        <div className={styles.headingContainer}>
          <Typography
            fontWeight="fontWeightMedium"
            fontSize={64}
            className={styles.titleHeading}
          >
            OutDoorly
          </Typography>
          <Typography className={styles.subHeading}>
            Exploring national parks in the US
          </Typography>
        </div>
      </div>
      <br />
      <br />
      <div className={styles.form}>
        <SearchForm />
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
