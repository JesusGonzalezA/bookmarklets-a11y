import { panel } from "../../components/panel/index";
import { execute } from "../../helpers/execute";
import { createDetector } from "../../helpers/create-detector";

const detect = createDetector({
    getItems: () =>
        execute(({ document }) =>
            document.getAnimations().filter(a => a.playState === 'running')
        ),
    getTarget: animation => animation.effect?.target,
    label: 'Reduced Motion',
    emptyMessage: '✅ Reduced Motion no detectó animaciones activas.'
});

const init = () => {
    panel.addFolder(
        'Reduced motion', 
        detect, 
        { 
            isAvailable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            availableMsg: 'Reduced motion no activo'
        }
    );
}

init();

export default init;