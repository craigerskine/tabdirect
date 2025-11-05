const input = document.getElementById("url");
const saveBtn = document.getElementById("save");
const statusEl = document.getElementById("status");

function isValidHttpUrl(str) {
  try {
    const u = new URL(str);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function setStatus(msg, ok = null) {
  statusEl.textContent = msg;
  statusEl.className = ok === null ? "hint" : ok ? "ok" : "err";
}

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["targetUrl"], ({ targetUrl }) => {
    if (targetUrl) input.value = targetUrl;
  });
});

saveBtn.addEventListener("click", async () => {
  const value = input.value.trim();
  if (!isValidHttpUrl(value)) {
    setStatus("Please enter a valid http(s) URL.", false);
    return;
  }
  await chrome.storage.sync.set({ targetUrl: value });
  setStatus("Saved!", true);
  setTimeout(() => setStatus(""), 2000);
});
