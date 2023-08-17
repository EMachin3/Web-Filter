/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
document.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON" || !e.target.closest("#updateFiltersButton")) {
    return;
  }
  sendUpdateMessage();
});
const inputField = document.getElementById("filters");
inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendUpdateMessage();
  }
});
function sendUpdateMessage() {
  browser.tabs.query({}, tabs => {
    tabs.forEach(tab => {
      browser.tabs.sendMessage(tab.id, {
        command: "updateFilters",
        updatedFilters: document.getElementById("filters").value
      });
    });
  });
};