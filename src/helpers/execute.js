const executeWithIframes = ({ handler, document, window }) => {
    let result = handler({ document, window });
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        try {
            if (iframe.contentDocument) {
                result = result.concat(executeWithIframes({ handler, document: iframe.contentDocument, window: iframe.contentWindow }));
            }
        } catch (e) {
            // Cross-origin iframe, skip
        }
    });

    return result;
}

export const execute = (handler) => {
    return executeWithIframes({ handler, document, window });
}