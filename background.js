// background.js
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "getAnswer",
        title: "Get Answer from ChatGPT",
        contexts: ["selection"]
    }, () => {
        if (chrome.runtime.lastError) {
            console.error(`Error: ${chrome.runtime.lastError}`);
        } else {
            console.log('Context menu item created successfully');
        }
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "getAnswer") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: getSelectedText,
            args: [info.selectionText]
        });
    }
});

function getSelectedText(selectedText) {
    chrome.runtime.sendMessage({ action: "getAnswer", text: selectedText });
}
