/**
 * An element attribute used to determine the x-speed of a marquee's scroll.
 */
export const DATA_MARQUEE_X_SPEED = "data-marquee-x"

/**
 * An element attribute used to determine the y-speed of a marquee's scroll.
 */
export const DATA_MARQUEE_Y_SPEED = "data-marquee-y"

/**
 * An element attribute that, when present, indicates an element was created by markii.js for the purpose of tiling.
 */
export const DATA_MARQUEE_EXTRA = "data-marquee-extra"

export interface MarqueeElement {
    paused: boolean,

    speed: { x: number, y: number },
    progress: { x: number, y: number },

    dimensions: {
        parent: { width: number, height: number },
        child: { width: number, height: number }
    }

    root: HTMLElement,
    realChild: HTMLElement,
    extraChildren: HTMLElement[]
}
