chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ AaaSEnabled: false });
  });
  
  chrome.action.onClicked.addListener((tab) => {
    chrome.storage.sync.get(['AaaSEnabled'], (result) => {
      const newState = !result.AaaSEnabled;
      chrome.storage.sync.set({ AaaSEnabled: newState }, () => {
        chrome.action.setIcon({
          path: newState ? "images/icon/AaaS logo.png" : "images/icon/AaaS logo gray.png",
          tabId: tab.id
        });
        chrome.tabs.sendMessage(tab.id, { action: "toggleAaaS", enabled: newState });
      });
    });
  });