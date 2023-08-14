/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON" || !e.target.closest("#updateFiltersButton")) {
      return;
    }
    browser.tabs.query({}, tabs => {
      tabs.forEach(tab => {
        browser.tabs.sendMessage(tab.id, {
          command: "updateFilters",
          updatedFilters: document.getElementById("filters").value
        });
      });
    });
  });
}
listenForClicks() //TODO: Either add more functionality to this file or make this a lambda expression