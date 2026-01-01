const highlight = (elements, outlineColor, useBorder) => {
    elements.forEach(el => {
        if (!el) return;
        el.style.outline = `8px solid ${outlineColor}`;
        el.style.outlineOffset = '3px';
        el.style.outlineStyle = 'dashed';
        
        if (!useBorder) return;
        el.style.border = `3px solid ${outlineColor}`;
        el.style.borderStyle = 'dashed';
    });
};

export const createDetector = ({
    getItems,
    getTarget = item => item,
    label,
    emptyMessage
}) => {
    let previous = new Set();

    return (options) => {
        const items = getItems();

        const targets = items.map(getTarget).filter(Boolean);
        highlight(targets, options.outlineColor, options.useBorder);

        const current = new Set(items);
        const newItems = items.filter(item => !previous.has(item));

        if (newItems.length > 0) {
            console.group(label);
            console.warn('🚨 Nuevos elementos detectados:', newItems);
            console.groupEnd();
        } else if (current.size === 0) {
            console.info(emptyMessage);
        }

        previous = current;
    };
};
