
let transcript = '';

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1 && node.innerText && node.innerText.includes(":")) {
        transcript += node.innerText + '\n';
        chrome.storage.local.set({ transcript });
      }
    });
  });
});

const target = document.querySelector('[aria-live="polite"]');
if (target) {
  observer.observe(target, { childList: true, subtree: true });
}
