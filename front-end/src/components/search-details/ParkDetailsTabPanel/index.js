import { Box } from "@mui/material";

export const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box sx={{pt: 3, pl: 5, pr: 5, pb:1}}>{children}</Box>}
    </div>
  );
};
