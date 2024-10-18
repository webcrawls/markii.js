import { MarqueeRenderer } from ".";
import { map } from "../math";

let rendererCount = 0

export class AnchorSingleRenderer implements MarqueeRenderer {

    private id: number
    private element: HTMLElement
    private progressX = 0.0;
    private progressY = 0.0;
    private dimensions: { width: number, height: number } = undefined
    private wrapper: HTMLElement = undefined
    private copy: HTMLElement = undefined

    public speedX = 0.01;
    public speedY = 0;

    constructor(element: HTMLElement) {
        this.element = element
        this.id = ++rendererCount;
    }

    setup(): void {
        const { width, height } = this.element.getBoundingClientRect()
        this.dimensions = { width, height }

        // would set up a 'resize observer' to update dims here?
        // would set up a 'mutation observer' to watch for prop changes here?

        // create a wrapper element that will "sit atop" the base element
        this.wrapper = createMarqueeWrapper(this.element, this.id)

        // create a copy of the base element
        this.copy = createMarqueeCopy(this.element, this.id)
        this.wrapper.appendChild(this.copy)
    
        // then, hide the base element (and set anchor-name)
        this.element.style.opacity = '0.0'
        this.element.style.anchorName = '--renderer'+this.id
    }

    remove(): void {
    }

    render(): void {
        const translateX = map(this.progressX, -1.0, 1.0, -120, 120)
        const translateY = map(this.progressY, -1.0, 1.0, -120, 120)

        this.copy.style.transform = `translate(${Math.round(translateX)}%, ${Math.round(translateY)}%)`

        if (this.progressX > 1) {
            this.progressX = -1.0
        }
        if (this.progressX < -1.0) {
            this.progressX = 1.0
        }

        if (this.progressY > 1.0) {
            this.progressY = -1.0
        }

        if (this.progressY < -1.0) {
            this.progressY = 1.0
        }


        this.progressX = this.progressX + this.speedX
        this.progressY = this.progressY + this.speedY
    }

}

export class TiledAnchorSingleRenderer implements MarqueeRenderer {

    private id: number
    private element: HTMLElement
    private progressX = 0.0;
    private progressY = 0.0;
    private dimensions: { width: number, height: number } = undefined
    private wrapper: HTMLElement = undefined
    private verticalCopies: HTMLElement[] = []
    private horizontalCopies: HTMLElement[] = []

    public speedX = 0.01;
    public speedY = 0;

    constructor(element: HTMLElement) {
        this.element = element
        this.id = ++rendererCount;
    }

    setup(): void {
        const { width, height } = this.element.getBoundingClientRect()
        this.dimensions = { width, height }

        // would set up a 'resize observer' to update dims here?
        // would set up a 'mutation observer' to watch for prop changes here?

        // create a wrapper element that will "sit atop" the base element
        this.wrapper = createMarqueeWrapper(this.element, this.id)

        // create a copy of the base element
        this.copy = createMarqueeCopy(this.element, this.id)
        this.wrapper.appendChild(this.copy)
    
        // then, hide the base element (and set anchor-name)
        this.element.style.opacity = '0.0'
        this.element.style.anchorName = '--renderer'+this.id
    }

    remove(): void {
    }

    render(): void {
        const translateX = map(this.progressX, -1.0, 1.0, -120, 120)
        const translateY = map(this.progressY, -1.0, 1.0, -120, 120)

        this.copy.style.transform = `translate(${Math.round(translateX)}%, ${Math.round(translateY)}%)`

        if (this.progressX > 1) {
            this.progressX = -1.0
        }
        if (this.progressX < -1.0) {
            this.progressX = 1.0
        }

        if (this.progressY > 1.0) {
            this.progressY = -1.0
        }

        if (this.progressY < -1.0) {
            this.progressY = 1.0
        }


        this.progressX = this.progressX + this.speedX
        this.progressY = this.progressY + this.speedY
    }

}

const createMarqueeWrapper = (parent: HTMLElement, id: number): HTMLElement => {
    const wrapperElement: HTMLDivElement = document.createElement("div")
    const dimensions = parseDimensions(parent)

    wrapperElement.id = `markii-wrapper-${id}`
    wrapperElement.style.position = "absolute";
    wrapperElement.style.top = `anchor(--renderer${id} self-start)`
    wrapperElement.style.width = `${dimensions.width}px`
    wrapperElement.style.height = `${dimensions.height}px`

    wrapperElement.style.overflow = "hidden"

    parent.parentElement?.appendChild(wrapperElement)
    return wrapperElement
}

const createMarqueeCopy = (base: HTMLElement, id: number): HTMLElement => {
    // create a "full copy" of the node?
    const copy: HTMLElement = base.cloneNode(true)
    copy.style.position = 'absolute';
    copy.style.top = `anchor(--renderer${id} self-start)`
    copy.style.margin = '0'
    return copy
}

const parseDimensions = (root: HTMLElement): { width: number, height: number } => {
    const { width, height } = root.getBoundingClientRect()
    return { width, height }
}
