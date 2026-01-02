import { panel } from "../../components/panel/index";
import { execute } from "../../helpers/execute";
import { createDetector } from "../../helpers/create-detector";

const detect = createDetector({
    getItems: () =>
        execute(({ document }) =>
            Array.from(document.querySelectorAll('video'))
                .filter(video => (!video.paused && video.currentTime > 0) || (!video.controls))
        ),
    label: 'Autoplay video',
    emptyMessage: '✅ Autoplay video no detectó vídeos activos o sin controles.'
});

const init = () => {
    panel.addFolder('Autoplay videos', detect);
}

init();

export default init;
