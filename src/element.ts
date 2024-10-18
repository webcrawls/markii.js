import { DATA_MARQUEE_TILE, DATA_MARQUEE_X_SPEED, DATA_MARQUEE_Y_SPEED } from './main'
import { AnchorSingleRenderer } from './render/anchor'

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

export const createMarquee = (element: HTMLElement): MarqueeElement => {
    let animationId: number = 0

    // if (element.getAttribute(DATA_MARQUEE_TILE)) 

    const renderer = new AnchorSingleRenderer(element)

    renderer.speedY = parseFloat(element.getAttribute(DATA_MARQUEE_Y_SPEED) ?? "0.0")
    renderer.speedX = parseFloat(element.getAttribute(DATA_MARQUEE_X_SPEED) ?? "0.0")

    renderer.setup()

    const tick = () => {
        animationId = requestAnimationFrame(() => {
            renderer.render()
            tick()
        })
    }

    const start = () => tick()
    const stop = () => { 
        cancelAnimationFrame(animationId)
        renderer.remove()
     }


    return {
        element, renderer,
        start, stop
    }
}
