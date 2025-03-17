let AaaSEnabled = false;

chrome.storage.sync.get(['AaaSEnabled'], (result) => {
  AaaSEnabled = result.AaaSEnabled;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleAaaS") {
    AaaSEnabled = message.enabled;
  }
});

document.addEventListener('keydown', (event) => {
  if (AaaSEnabled) {
    const images = Array.from(document.querySelectorAll('img, video'));
    const currentIndex = images.findIndex(img => img === document.activeElement);

    if (event.key === 'ArrowRight' || event.key === 'd') {
      if (currentIndex < images.length - 1) {
        images[currentIndex + 1].focus();
      }
    } else if (event.key === 'ArrowLeft' || event.key === 'a') {
      if (currentIndex > 0) {
        images[currentIndex - 1].focus();
      }
    }
  }
});