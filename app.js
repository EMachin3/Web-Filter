//let filters = ["\"free\""]
//TODO: Restore the old page contents if something isn't being filtered anymore
let filters = [];
browser.storage.local.get("storedFilters", function (result) {
    alert(JSON.stringify(result));
    // if (Object.keys(result).length === 0) {
    //     alert('There is no key!'); 
    //     filters = [];
    // }
    // else {
    //     filters = result[]
    // }
    if (Object.keys(result).length !== 0) {
        filters = result["storedFilters"];
    }
    //filters = (Object.keys(result).length === 0) ? [] : result["storedFilters"];
})
filterWebpage()
window.setInterval(filterWebpage, 10000);
browser.runtime.onMessage.addListener((message) => {
    if (message.command === "updateFilters") {
        //alert(message.updatedFilters);
        updateFilters(message.updatedFilters);
    }
})
function updateFilters(csvFilters) {
    let filtersList = csvFilters.split(',');
    if (filtersList.length === 0) { return; }
    let newFilterList = [];
    for (let i=0; i<filtersList.length - 1; i++) {
        newFilterList.push("\"" + filtersList[i] + "\""/* + "\", "*/);
    }
    newFilterList.push("\"" + filtersList[filtersList.length - 1] + "\"")
    alert(newFilterList.join(""));
    filters = newFilterList;
    browser.storage.local.set({"storedFilters": newFilterList});
}
//TODO: Function for updating popup to state which phrases are currently filtered
function filterWebpage() {
    //'use strict';
    //let sampleQuery = `//*[contains(text(), "things") or contains(text(), "my")]`
    const multipleResults = document.evaluate(getQuery(), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    //console.log("Length is", multipleResults.snapshotLength)
    for (let i=0; i < multipleResults.snapshotLength; i++) {
        //console.log(multipleResults.snapshotItem(i).textContent)
        multipleResults.snapshotItem(i).textContent = "[REDACTED]" //This is how you would change the contents
    }
}

function getQuery() {
    //let filters = ["\"my\"", "\"things that\""]
    //filters variable defined at global scope
    if (filters.length === 0) { return `//*[contains(text(), "FNDACKLFSDACKFJKAFJ")]`} //doesn't break program but just doesn't change anything
    let query = [`//*[`]
    query.push(`contains(text(), ${filters[0]})`)
    for (let i=1; i<filters.length; i++) {
        query.push(` or contains(text(), ${filters[i]})`)
    }
    query.push(`]`)
    //console.log(query.join(""))
    return query.join("")
}
