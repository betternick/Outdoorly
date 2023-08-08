import Typography from "@mui/material/Typography";
import { useState } from "react";
import DistanceForm from "./distance-search";
import PreferenceSearch from "./preference-search";
import { Tab, Tabs, Box } from "@mui/material";
import { TabPanel } from "../../search-details/ParkDetailsTabPanel/index";

const DISTANCE_SEARCH = "Distance ";
const PREFERENCES_SEARCH = "Preferences ";

export default function SearchForm() {
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState(PREFERENCES_SEARCH);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography sx={{ mt: 3, mb: 1 }} variant="h4">
        Searching by
      </Typography>
      <Tabs value={value} onChange={handleChange} aria-label="tabs">
        <Tab style={{ fontSize: 18 }} label="Preferences" />
        <Tab style={{ fontSize: 18 }} label="Distance" />
      </Tabs>
      <div role="tabpanel" hidden={value !== 1} id={`tabpanel-${1}`}>
        {value === 1 && (
          <Box sx={{ pt: 0, pl: 5, pr: 5, pb: 1 }}>
            <DistanceForm />
          </Box>
        )}
      </div>
      <div role="tabpanel" hidden={value !== 0} id={`tabpanel-${0}`}>
        {value === 0 && (
          <Box sx={{ pt: 0, pl: 5, pr: 5, pb: 1 }}>
            <PreferenceSearch />
          </Box>
        )}
      </div>
    </>
  );
}
