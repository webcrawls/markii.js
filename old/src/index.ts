import {createMarquee, deleteMarquee} from './marquee'
import {schedule, cancel} from './render'
import {DATA_MARQUEE_X_SPEED, DATA_MARQUEE_Y_SPEED} from "./const";

export {createMarquee, deleteMarquee, schedule, cancel}

const scanMarquees = () => {
    for (const element of document.querySelectorAll(`[${DATA_MARQUEE_X_SPEED}], [${DATA_MARQUEE_Y_SPEED}]`)) {
        createMarquee(element)
    }
}

scanMarquees()
schedule()