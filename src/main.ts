import { createMarquee, MarqueeElement } from './element'

export const DATA_MARQUEE_X_SPEED = "mq-speed-x"
export const DATA_MARQUEE_Y_SPEED = "mq-speed-y"
export const DATA_MARQUEE_TILING = "mq-tiled"

export class Markii {

    private root: HTMLElement
    private observer: MutationObserver | undefined
    private marquees: MarqueeElement[] = []

    isMarquee(element: HTMLElement): boolean {
        for (const marquee of this.marquees) {
            if (marquee.element === element) return true
        }
        return false
    }

    watch() {
        this.observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                this.processElement(mutation.target)
            }
        })
        this.observer.observe(this.root, { attributeFilter: [DATA_MARQUEE_X_SPEED, DATA_MARQUEE_Y_SPEED], subtree: true})
    }

    stop() {
        this.observer?.disconnect()
        for (const marquee of this.marquees) {
            marquee.stop()
        }
        this.marquees = []
    }

    pause() {
        throw new Error("Not implemented")
    }

    constructor(root?: HTMLElement) {
        this.root = root ?? document.body
        this.checkRoot()
        this.watch()
    }

    private checkRoot() {
        const elements = this.root.querySelectorAll(`[${DATA_MARQUEE_X_SPEED}], [${DATA_MARQUEE_Y_SPEED}]`)
        elements.forEach(el => this.processElement(el))
    }

    private elementShouldMarquee(element: HTMLElement) {
        return element.hasAttribute(DATA_MARQUEE_X_SPEED) || element.hasAttribute(DATA_MARQUEE_Y_SPEED)
    }

    private processElement(element: HTMLElement) {
        const hasMarqueeFeatures = this.elementShouldMarquee(element)
        if (this.isMarquee(element) && !hasMarqueeFeatures) {
            // delete marquee
            for (const marquee of this.marquees) {
                if (marquee.element === element) {
                    marquee.stop()
                    this.marquees = this.marquees.filter(m => m !== marquee)
                }
            }
        } else if (!this.isMarquee(element) && hasMarqueeFeatures) {
            const m = createMarquee(element)
            m.start()
            this.marquees.push(m)
        }
    }

}