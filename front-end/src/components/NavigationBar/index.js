import { AppBar } from "@mui/material";
import styles from "./navigation-bar.module.scss";
import HikingIcon from "@mui/icons-material/Hiking";
import { useNavigate } from "react-router-dom";
import { getLogoutRoute, getRoutes } from "../../routes";
import { USER_SESSION, isInLocalStorage } from "../../session";
import { Login } from "../../pages/login";
import axios from "axios";

export function NavigationBar() {
  const navigate = useNavigate();
  return (
    <div className={styles.navBar}>
      <AppBar position="static" className={styles.header}>
        <div
          className={styles.pageName}
          onClick={() => {
            navigate(getRoutes().home);
          }}
        >
          <HikingIcon className={styles.navIcon} />
          OutDoorly
        </div>
        {isInLocalStorage(USER_SESSION) ? (
          <div
            className={styles.logout}
            onClick={async () => {
              try {
                localStorage.removeItem(USER_SESSION);
                await axios.get(getLogoutRoute(), {
                  headers: { access_token: localStorage.getItem(USER_SESSION) },
                });

                window.location.reload();
              } catch (e) {
                console.log("error:", e);
              }
            }}
          >
            Logout
          </div>
        ) : (
          <Login className={styles.login} />
        )}
      </AppBar>
    </div>
  );
}
