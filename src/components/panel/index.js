import { GUI } from 'dat.gui';

class Panel {
    constructor() {
        this._panel = new GUI();
        this._panel.domElement.parentElement.style.zIndex = 999;
    }

    addFolder(title, detect, options) {
        const userOptions = {
            enable: false,
            interval: null,
            detectionInterval: 1000,
            outlineColor: '#FF0000',
            useBorder: false
        };
        options ??= {};
        if (typeof options.isAvailable !== 'function') {
            options.isAvailable = () => true;
        }

        const folder = this._panel.addFolder(title);

        const enabledController = folder
            .add(userOptions, 'enable');
        
        const handleChange = () => {
            if (userOptions.interval) clearInterval(userOptions.interval);
            if (userOptions.enable) 
                userOptions.interval = setInterval(() => {
                    if (!options.isAvailable()) {
                        enabledController.setValue(false);
                        alert(options.availableMsg ?? `${title} no disponible.`);
                        return;
                    }
                    detect(userOptions);
                }, userOptions.detectionInterval);
        };

        enabledController
            .onChange(handleChange)
            .listen();

        folder
            .add(userOptions, 'detectionInterval')
            .onFinishChange(handleChange);

        folder
            .addColor(userOptions, 'outlineColor')
            .onChange(handleChange);

        folder
            .add(userOptions, 'useBorder')
            .onChange(handleChange);
    }
}

const panel = new Panel();

export { panel };