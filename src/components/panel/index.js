import { Pane } from 'tweakpane';

class Panel {
    constructor() {
        this._panel = new Pane();
    }

    addFolder(title, detect) {
        const userOptions = {
            enable: false,
            interval: null,
            detectionInterval: 1000,
            outlineColor: '#FF0000',
            useBorder: false
        };

        const folder = this._panel.addFolder({ title });
        
        const handleChange = () => {
            if (userOptions.interval) clearInterval(userOptions.interval);
            if (userOptions.enable) 
                userOptions.interval = setInterval(() => {
                    detect(userOptions);
                }, userOptions.detectionInterval);
        };

        folder
            .addBinding(userOptions, 'enable')
            .on('change', handleChange);

        folder
            .addBinding(userOptions, 'detectionInterval')
            .on('change', handleChange);

        folder
            .addBinding(userOptions, 'outlineColor', { view: 'color' })
            .on('change', handleChange);

        folder
            .addBinding(userOptions, 'useBorder')
            .on('change', handleChange);
    }
}

const panel = new Panel();

export { panel };