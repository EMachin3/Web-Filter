/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
document.addEventListener("DOMContentLoaded", (event) => {
  sendGetFiltersMessage();
});
browser.runtime.onMessage.addListener((message) => {
  if (message.command === "returnedFilters") {
    //alert(JSON.stringify(message.currentFilters));
    let filterArrCopy = message.currentFilters.slice();
    for (let i=0; i<filterArrCopy.length; i++) {
      filterArrCopy[i] = filterArrCopy[i].replace("\"", "")
      filterArrCopy[i] = filterArrCopy[i].replace("\"", "") //This has to be run twice to remove all of the quotes, trust me
    }
    //alert(filterArrCopy.join(", "))
    document.getElementById("filtersList").textContent = "Current Filters: " + filterArrCopy.join(", ");
  }
})
document.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON" || !e.target.closest("#updateFiltersButton")) {
    return;
  }
  else {
    sendUpdateMessage();
  }
});
const inputField = document.getElementById("filters");
inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendUpdateMessage();
  }
  // else if (event.key === "]") {
  //   sendGetFiltersMessage(); //for debugging purposes, filter text display should load on startup now
  // }
  // else {
  //   alert (event.key)
  // }
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
function sendGetFiltersMessage() {
  browser.tabs.query({}, tabs => {
    tabs.forEach(tab => {
      browser.tabs.sendMessage(tab.id, {
        command: "getFilters"
      });
    });
  });
};