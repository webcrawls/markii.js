import { MarqueeRenderer, getId } from ".";
import { map } from "../math";

/**
 * A renderer that uses CSS Anchor to display a marquee "on top of" an element.
 */
export class AnchorRenderer implements MarqueeRenderer {

    private id: number
    private element: HTMLElement
    private wrapper: HTMLElement = undefined
    private clones: ElementClone[] = []

    private width: number = 0.0;
    private height: number = 0.0;

    private progressX = 0.0;
    private progressY = 0.0;

    public tiled = true
    public speedX = 0.01;
    public speedY = 0;

    constructor(element: HTMLElement) {
        this.element = element
        this.id = getId();
    }

    setup(): void {
        ({ width: this.width, height: this.height } = this.element.getBoundingClientRect())

        // create a wrapper element that will "sit atop" the base element
        this.wrapper = createMarqueeWrapper(this.element, this.id)
        this.element.parentNode?.appendChild(this.wrapper)

        // then, hide the base element (and set anchor-name)
        this.element.style.visibility = 'hidden'
        this.element.style.anchorName = '--renderer' + this.id

        if (this.tiled) {
            // calculate x requirement. calculate y requirement.
            // create all those elements
            // offset them somehow? (we're already using transform)
            // we'll need to store individual state I THINK
            // or not, and all values can be derived from progress, dimensions, and position

            const elementX = this.width
            const parentX = this.wrapper.getBoundingClientRect().width
        } else {
            // create a copy of the base element
            let copy = createMarqueeCopy(this.element, this.id)
            this.copies.push(copy)
            this.wrapper.appendChild(copy)
        }

        console.log(this.wrapper)
    }

    remove(): void {
        this.wrapper.remove()
        this.element.style.visibility = 'visible'
        this.element.style.anchorName = ''
    }

    render(): void {
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

class ElementClone {

    constructor(wrapper: HTMLElement,
                target: HTMLElement) {
    }

    update() {
        let translateX = !this.speedX ? 0.0 : map(this.progressX, -1.0, 1.0, -this.dimensions.width, this.wrapper.getBoundingClientRect().width)
        let translateY = !this.speedY ? 0.0 : map(this.progressY, -1.0, 1.0, -this.dimensions.height, 120)

        let transform = `translate(${Math.round(translateX)}px, ${Math.round(translateY)}px)`
        this.copy.style.transform = transform
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
    return wrapperElement
}

const createMarqueeCopy = (base: HTMLElement, id: number): HTMLElement => {
    // create a "full copy" of the node?
    const copy: HTMLElement = base.cloneNode(true)
    copy.style.position = 'absolute';
    copy.style.top = `anchor(--renderer${id} self-start)`
    copy.style.margin = '0'
    copy.style.visibility = 'visible'
    copy.style.anchorName = ''
    return copy
}

const parseDimensions = (root: HTMLElement): { width: number, height: number } => {
    const { width, height } = root.getBoundingClientRect()
    return { width, height }
}
