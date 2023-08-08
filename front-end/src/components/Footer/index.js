import React from "react";

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#6f4e37",
        color: "white",
        padding: "5px",
        textAlign: "center",
      }}
    >
      <p>
        <a
          href="https://www.nps.gov/subjects/developer/api-documentation.htm"
          target="_blank"
          rel="noreferrer"
        >
          Special thanks to National Park Service
        </a>
      </p>
    </footer>
  );
};

export default Footer;
