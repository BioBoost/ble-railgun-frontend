let logContainer = undefined;

document.addEventListener('DOMContentLoaded', (event) => {
    logContainer = document.getElementById("log-container");
});

let log = (message) => {
    if (logContainer) {
        var paragraph = document.createElement("p");
        var text = document.createTextNode(message); 
        paragraph.appendChild(text); 
        logContainer.insertBefore(paragraph, logContainer.firstChild);
    }
}