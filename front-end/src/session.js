export const USER_SESSION = "outdoorly_us";
export const INVALID_TOKEN = "";

export function isInLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value !== null;
  } catch (error) {
    // Handle any potential errors, e.g., if local storage is not available
    console.error("Error checking local storage:", error);
    return false;
  }
}

export function writeToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(
      `Error writing "${value}" to local storage with key "${key}":`,
      error
    );
  }
}
