function showClassCSS(tagName) {
    const elements = document.querySelectorAll(tagName);

    elements.forEach((element) => {
        const classList = [...element.classList];
        if (classList.length === 0) return;

        let collected = [];

        // Loop through all stylesheets
        for (const sheet of document.styleSheets) {
            let rules;
            try {
                rules = sheet.cssRules; // may throw due to CORS
            } catch {
                continue;
            }

            // Loop through rules
            for (const rule of rules) {
                if (!rule.selectorText) continue;

                classList.forEach((cls) => {
                    const selector = '.' + cls;

                    // Match exact class selector
                    if (rule.selectorText === selector) {
                        collected.push(rule.cssText);
                    }
                });
            }
        }

        // Create <pre> block to show CSS
        const p = document.createElement('p');
        p.className = 'label';
        const escaped = collected
            .join('\n\n')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/{/g, '{<br>')
            .replace(/}/g, '<br>}')
            .replace(/;/g, ';<br>');

        p.innerHTML = escaped || '(no class CSS found)';
        element.insertAdjacentElement('beforebegin', p);
    });
}
showClassCSS('hr');
