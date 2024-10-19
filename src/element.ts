import { DATA_MARQUEE_TILE, DATA_MARQUEE_X_SPEED, DATA_MARQUEE_Y_SPEED } from './main'
import { type MarqueeRenderer } from './render'
import { AbsoluteSingleRenderer } from './render/single-absolute'
import { AnchorSingleRenderer } from './render/single-anchor'

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
    if (element.children.length === 0) {
        renderer = new AnchorSingleRenderer(element)
    } else {
        throw new Error("I don't know how to Marquee-ify" + element)
    }

    renderer.speedY = parseFloat(element.getAttribute(DATA_MARQUEE_Y_SPEED) ?? "0.0")
    renderer.speedX = parseFloat(element.getAttribute(DATA_MARQUEE_X_SPEED) ?? "0.0")
    renderer.setup()

    const observer = new MutationObserver((changes) => {
        let hasAny = false
        for (let attr of [DATA_MARQUEE_X_SPEED, DATA_MARQUEE_Y_SPEED]) {
            if (element.hasAttribute(attr)) {
                hasAny = true
                return
            }
        }

        if (!hasAny) {
            stop()
        }
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
