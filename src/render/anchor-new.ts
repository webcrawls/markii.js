import { getId, MarqueeRenderer } from ".";
import { map } from "../math";

type Dimensions = { x: number, y: number }
type ClonedElement = {
    root: HTMLElement
}

export class AnchorRenderer implements MarqueeRenderer {

    public speedX: number = 0.01;
    public speedY: number = 0.0;
    public tiled: boolean = false;

    private progressY: number = -1.0;
    private progressX: number = -1.0;

    private id: number = getId()
    private target: HTMLElement = undefined
    private dimensions: Dimensions = { x: 0, y: 0 }
    private wrapper: HTMLElement = undefined
    private wrapperDimensions: Dimensions = { x: 0, y: 0 }
    private children: ClonedElement[] = []

    constructor(target: HTMLElement) {
        console.log("Constructing anchor renderer", target)
        this.target = target
    }

    setup(): void {
        this.wrapSelf()
        this.initializeClones()
    }

    remove(): void {
        // throw new Error("Method not implemented.");
    }
    render(): void {
        this.tickProgress()

        let index = 0
        for (const child of this.children) {
            const translateX = map(this.progressX, -1.0, 1.0, -150, this.dimensions.x)
            console.log(this.progressX)
            child.root.style.transform = `translateX(${Math.round(translateX)}px)`
            index += 1
        }
    }

    private tickProgress() {
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

    private wrapParent() {
        // const wrapper = createParentWrapper(this.target, this.id)
        // this.target.parentElement?.appendChild(wrapper)
    }

    private wrapSelf() {
        const rect = this.target.getBoundingClientRect()
        this.dimensions = { x: rect.width, y: rect.height }

        this.wrapper = createSelfWrapper(this.id, this.dimensions)
        this.target.parentElement?.appendChild(this.wrapper)

        this.target.style.anchorName = "--mq-render-"+this.id
        this.target.style.visibility = "hidden"
    }

    private initializeClones() {
        const clone = createClone(this.target)
        this.wrapper.appendChild(clone)
        this.children.push({ root: clone })
    }
}

const createClone = (target: HTMLElement): HTMLElement => {
    const newTarget = target.cloneNode(true)
    newTarget.style.visibility = "visible"
    newTarget.style.anchorName = ""
    newTarget.style.display = "inline-block"
    return newTarget
}

const createSelfWrapper = (id: number,
                           dimensions: Dimensions) => {
    const wrapper = document.createElement("div")
    wrapper.style.position = "absolute"
    wrapper.style.top = "anchor(--mq-render-"+id+" start)"
    wrapper.style.width = dimensions.x+"px"
    wrapper.style.height = dimensions.y+"px"
    return wrapper
}