function processGmailRows(): void {
  const rows = document.querySelectorAll('tr');
  
  if (rows.length === 0) {
    console.debug('No Gmail rows found');
    return;
  }

  rows.forEach((tr, index) => {
    try {
      const targetCell = tr.children[5] as HTMLElement;

      
      if (!targetCell) {
        console.debug(`Row ${index}: No target cell found`);
        return;
      }

      const elementPath = [
        targetCell.children[0],
        targetCell.children[0]?.children[0],
        targetCell.children[0]?.children[0]?.children[0]
      ].filter(Boolean) as HTMLElement[];

      if (elementPath.length < 3) {
        console.log(`Row ${index}: Incomplete element path`);
        return;
      }

      const [div1, div2, div3] = elementPath;
      const removableElement = div3.children[0] as HTMLElement;
      const spanContainer = div3.children[1] as HTMLElement;

      if (removableElement) {
        removableElement.remove();
      }

      if (spanContainer) {
        spanContainer.style.setProperty('white-space', 'pre', 'important');
        
        const spanZt = spanContainer.children[0] as HTMLElement;
        if (spanZt) {
          spanZt.style.setProperty('white-space', 'pre', 'important');
        }
      }

      //remove all td except targetCell
        Array.from(tr.children).forEach((td, tdIndex) => {
            if (tdIndex !== 5) {
            td.remove();
            }
        });

        //flatter the row
        const flattenedRow = Array.from(tr.children).reduce((acc, td) => {
            const textContent = td.textContent?.trim() || '';
            if (textContent) {
                acc.push(textContent);
            }
            return acc;
        }, [] as string[]);


        // apply the flattened row to the target cell
        targetCell.textContent = flattenedRow.join(' ');
        targetCell.style.setProperty('white-space', 'break-spaces', 'important');


    } catch (error) {
      console.error(`Error processing row ${index}:`, error);
    }
  });
}

function observeGmailChanges(): void {
  const observer = new MutationObserver((mutations) => {
    const hasRelevantChanges = mutations.some(mutation => 
      mutation.type === 'childList' && 
      (mutation.target as Element).closest('table, tbody, tr')
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

  // Also listen for URL changes in Gmail SPA
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(processGmailRows, 500);
    }
  }).observe(document, { subtree: true, childList: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    processGmailRows();
    observeGmailChanges();
  });
} else {
  processGmailRows();
  observeGmailChanges();
}