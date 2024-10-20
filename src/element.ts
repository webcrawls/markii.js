import { DATA_MARQUEE_X_SPEED, DATA_MARQUEE_Y_SPEED } from './main'
import { type MarqueeRenderer } from './render'
import { AnchorRenderer } from './render/anchor-new'

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

    let renderer: MarqueeRenderer;


    // determine appropriate renderer type...
    // // (this is where we'd say 'oh, use a canvas renderer for images')
    renderer = new AnchorRenderer(element)
    renderer.speedY = parseFloat(element.getAttribute(DATA_MARQUEE_Y_SPEED) ?? "0.0")
    renderer.speedX = parseFloat(element.getAttribute(DATA_MARQUEE_X_SPEED) ?? "0.0")
    renderer.setup()

    const observer = new MutationObserver((changes) => {
                // would set up a 'resize observer' to update dims here?
        // would set up a 'mutation observer' to watch for prop changes here?

    })

    observer.observe(element, { attributes: true })

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
        observer.disconnect()
    }

    return {
        element,
        renderer,
        start,
        stop
    }
}
