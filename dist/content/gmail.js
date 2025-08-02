function processGmailRows() {
  const rows = document.querySelectorAll("tr");
  if (rows.length === 0) {
    console.debug("No Gmail rows found");
    return;
  }
  rows.forEach((tr, index) => {
    var _a, _b, _c;
    try {
      const targetCell = tr.children[5];
      if (!targetCell) {
        console.debug(`Row ${index}: No target cell found`);
        return;
      }
      const elementPath = [
        targetCell.children[0],
        (_a = targetCell.children[0]) == null ? void 0 : _a.children[0],
        (_c = (_b = targetCell.children[0]) == null ? void 0 : _b.children[0]) == null ? void 0 : _c.children[0]
      ].filter(Boolean);
      if (elementPath.length < 3) {
        console.log(`Row ${index}: Incomplete element path`);
        return;
      }
      const [div1, div2, div3] = elementPath;
      const removableElement = div3.children[0];
      const spanContainer = div3.children[1];
      if (removableElement) {
        removableElement.remove();
      }
      if (spanContainer) {
        spanContainer.style.setProperty("white-space", "pre", "important");
        const spanZt = spanContainer.children[0];
        if (spanZt) {
          spanZt.style.setProperty("white-space", "pre", "important");
        }
      }
      Array.from(tr.children).forEach((td, tdIndex) => {
        if (tdIndex !== 5) {
          td.remove();
        }
      });
      const flattenedRow = Array.from(tr.children).reduce((acc, td) => {
        var _a2;
        const textContent = ((_a2 = td.textContent) == null ? void 0 : _a2.trim()) || "";
        if (textContent) {
          acc.push(textContent);
        }
        return acc;
      }, []);
      targetCell.textContent = flattenedRow.join(" ");
      targetCell.style.setProperty("white-space", "break-spaces", "important");
    } catch (error) {
      console.error(`Error processing row ${index}:`, error);
    }
  });
}
function observeGmailChanges() {
  const observer = new MutationObserver((mutations) => {
    const hasRelevantChanges = mutations.some(
      (mutation) => mutation.type === "childList" && mutation.target.closest("table, tbody, tr")
    );
    if (hasRelevantChanges) {
      setTimeout(processGmailRows, 100);
    }
  });
  const targetNode = document.querySelector('[role="main"], .nH') || document.body;
  observer.observe(targetNode, {
    childList: true,
    subtree: true
  });
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(processGmailRows, 500);
    }
  }).observe(document, { subtree: true, childList: true });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    processGmailRows();
    observeGmailChanges();
  });
} else {
  processGmailRows();
  observeGmailChanges();
}
