import { Pagination } from "@mui/material";
import ResultListItem from "../ResultListItem";
import styles from "./results-listing.module.scss";
import { useDispatch } from "react-redux";
import { setPageNumber } from "../../../redux/ParkSearchInfo/ParkSearchInfo.slice";
import { searchForParks } from "../../../redux/ParkSearchInfo/ParkSearchInfo.thunks";

export default function ResultsListing({ searchResults }) {
  const dispatch = useDispatch();
  return (
    <div>
      <h3 className={styles.resultsHeading}>
        {searchResults.count === 1 ? "Result" : "Results"} (
        {searchResults.count})
      </h3>
      {searchResults.data?.map((p) => {
        return (
          <div>
            <ResultListItem
              key={p.parkCode}
              fullName={p.fullName}
              parkID={p._id}
              distance={p.distance}
              description={p.description}
              images={p.images}
              park={p}
            />
            <br />
          </div>
        );
      })}
      <div className={styles.pagination}>
        <Pagination
          count={searchResults.totalPages}
          page={searchResults.currentPage}
          onChange={(_, page) => {
            dispatch(setPageNumber(page));
            dispatch(searchForParks());
            window.scrollTo(0, 0);
          }}
          color="primary"
        />
      </div>
      <br />
    </div>
  );
}
