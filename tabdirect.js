const DEFAULT_URL = "https://qrayg.com/currently/";

function isValidHttpUrl(str) {
  try {
    const u = new URL(str);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

chrome.storage.sync.get(["targetUrl"], ({ targetUrl }) => {
  const url = isValidHttpUrl(targetUrl) ? targetUrl : DEFAULT_URL;
  location.replace(url);
});
