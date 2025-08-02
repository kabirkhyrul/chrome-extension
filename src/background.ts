chrome.runtime.onInstalled.addListener(() => {
  console.log('Chrome extension installed');
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const url = new URL(tab.url);
    
    if (url.hostname === 'mail.google.com') {
      console.log('Gmail tab detected');
    }
  }
});