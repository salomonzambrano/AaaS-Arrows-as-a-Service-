document.getElementById('toggleButton').addEventListener('click', () => {
    chrome.storage.sync.get(['AaaSEnabled'], (result) => {
      const newState = !result.AaaSEnabled;
      chrome.storage.sync.set({ AaaSEnabled: newState }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { action: "toggleAaaS", enabled: newState });
        });
        document.getElementById('toggleButton').style.backgroundColor = newState ? 'green' : 'gray';
      });
    });
  });
  
  chrome.storage.sync.get(['AaaSEnabled'], (result) => {
    document.getElementById('toggleButton').style.backgroundColor = result.AaaSEnabled ? 'green' : 'gray';
  });