import { createMarquee } from './element'

export const DATA_MARQUEE_X_SPEED = "data-marquee-x"
export const DATA_MARQUEE_Y_SPEED = "data-marquee-y"
export const DATA_MARQUEE_EXTRA = "data-marquee-extra"
export const DATA_MARQUEE_TILE = "data-marquee-tile"

let marquees = []

const findElements = (parent: HTMLElement) => {
    const elements = parent.querySelectorAll(`[${DATA_MARQUEE_X_SPEED}], [${DATA_MARQUEE_Y_SPEED}]`)
    elements.forEach(el => {
        console.log("making marquee", el)
        const marquee = createMarquee(el)
        marquee.start()
        marquees.push(marquee)
        console.log({marquee})
    })
}

export const markii = () => setTimeout(() => findElements(document.body), 100)