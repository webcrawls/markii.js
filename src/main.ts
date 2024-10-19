import { createMarquee } from './element'

export const DATA_MARQUEE_X_SPEED = "data-marquee-x"
export const DATA_MARQUEE_Y_SPEED = "data-marquee-y"
export const DATA_MARQUEE_EXTRA = "data-marquee-extra"
export const DATA_MARQUEE_TILE = "data-marquee-tile"

let marquees = {}

const findElements = (parent: HTMLElement) => {
    const elements = parent.querySelectorAll(`[${DATA_MARQUEE_X_SPEED}], [${DATA_MARQUEE_Y_SPEED}]`)
    elements.forEach(el => {
        // if (el in marquees) return 
        console.log("making marquee", el)
        const marquee = createMarquee(el)
        marquee.start()
        // marquees[el] = marquee
    })
}

export interface Markii {
    watch(): void
    stop(): void
}

export const createMarkii = (root?: HTMLElement): Markii => {
    if (!root) root = document.body

    const handleUpdate = (mutations) => {
        findElements(root)
    }
    
    let observer: MutationObserver = new MutationObserver(handleUpdate)

    const watch = () => {
        observer.observe(root, {
            subtree: true,
            attributeFilter: [DATA_MARQUEE_X_SPEED, DATA_MARQUEE_Y_SPEED]
        })
    }

    const stop = () => {
        observer.disconnect()
        // clear all Marquees?
    }

    return { watch, stop }
}