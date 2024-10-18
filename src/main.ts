import { createRenderer } from './render'
import './style.css'

export const DATA_MARQUEE_X_SPEED = "data-marquee-x"
export const DATA_MARQUEE_Y_SPEED = "data-marquee-y"
export const DATA_MARQUEE_EXTRA = "data-marquee-extra"

const findElements = (parent: HTMLElement) => {
    const elements = parent.querySelectorAll(`[${DATA_MARQUEE_X_SPEED}], [${DATA_MARQUEE_Y_SPEED}]`)
    elements.forEach(el => createRenderer(el))
}

findElements(document.body)