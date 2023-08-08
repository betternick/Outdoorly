import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthCallBackRoute, getRoutes } from "../routes";
import { USER_SESSION, writeToLocalStorage } from "../session";
import { ClimbingBoxLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt from "jwt-decode";

export function OAuthCallbackPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserSessionToken = async () => {
      try {
        if (code) {
          const response = await axios.get(getAuthCallBackRoute(code));
          const { token } = response.data;
          const decodedToken = jwt(token);
          writeToLocalStorage(USER_SESSION, token);
          toast.info(`Logged in successfully as ${decodedToken.name}`);
        }
      } catch (error) {
        console.error("Error fetching user session token:", error);
      } finally {
        setLoading(false);
        navigate(getRoutes().home);
      }
    };

    fetchUserSessionToken();
  }, [code, navigate]);

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}>
          <ClimbingBoxLoader size={60} color="#667761" />
        </div>
      ) : (
        <p>Error: Unable to fetch user session token.</p>
      )}
    </div>
  );
}
