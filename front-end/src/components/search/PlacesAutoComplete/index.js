import { useRef, useEffect, useState } from "react";
import styles from "./places-autocomplete.module.scss";

// Tutorial: https://betterprogramming.pub/the-best-practice-with-google-place-autocomplete-api-on-react-939211e8b4ce

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef, onChange) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"], componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery, onChange)
  );
}

async function handlePlaceSelect(updateQuery, onChange) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  onChange(addressObject.formatted_address);
}

function PlacesAutoComplete({ onChange }) {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&callback`,
      () => handleScriptLoad(setQuery, autoCompleteRef, onChange)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <input
      className={styles.searchCityInput}
      ref={autoCompleteRef}
      onChange={(event) => {
        setQuery(event.target.value);
      }}
      placeholder="Enter a city"
      value={query}
    />
  );
}

export default PlacesAutoComplete;
