import { getId, MarqueeRenderer } from ".";
import { map } from "../math";

type Dimensions = { x: number, y: number }

export class AnchorRenderer implements MarqueeRenderer {

    // the internal id of the renderer. used to create unique anchor names.
    private id: number = getId()

    // desired speed of the marquee animation, from -1.0 to 1.0.
    public speedX: number = 0.01;
    public speedY: number = 0.0;

    // whether or not the marquee should "tile"
    //  (this fucks shit up)
    public tiled: boolean = false;

    // the progress of animation in both x and y
    public progressY: number = 0.0;
    public progressX: number = 0.0;

    // the original target element we want to marquee.
    // if it is an element -without- children, :
    // if it is an element -with- children, :
    private target: HTMLElement = undefined

    // the original target dimensions. treat this as the 'canvas size'
    private targetDimensions: Dimensions = { x: 0, y: 0 }

    // a constructed element that will contain our marquee content.
    // the goal is to position the wrapper directly on top of the target element, with the same dimensions
    private targetWrapper: HTMLElement = undefined

    // todo
    private contentDimensions: Dimensions = { x: 0, y: 0 }

    // todo
    private children: HTMLElement[] = []
    private childrenProgress: Dimensions[] = []

    constructor(target: HTMLElement) {
        console.log("Constructing anchor renderer", target)
        this.target = target

        const targetRect = target.getBoundingClientRect()
        this.targetDimensions = { x: targetRect.width, y: targetRect.height }

    }

    setup(): void {
        this.wrapTarget()
        this.initializeClones()

        if (this.speedX != 0.0) this.progressX = -1.0
    }

    remove(): void {
        // throw new Error("Method not implemented.");
    }
    render(): void {
        this.tickProgress()

        let index = 0;
        for (const child of this.children) {
            let translateX = (this.contentDimensions.x * index)

            translateX = map(
                this.progressX,
                -1.0, 1.0,
                -this.contentDimensions.x,
                this.targetDimensions.x
            ) + (this.contentDimensions.x * index)

            if (translateX >= this.targetDimensions.x) {
                translateX = map(
                    this.progressX,
                    -1.0, 1.0,
                    -this.contentDimensions.x,
                    this.targetDimensions.x
                ) - (this.contentDimensions.x * (this.children.length - index))
            }

            child.style.transform = `translateX(${Math.round(translateX)}px)`
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

    private wrapTarget() {
        this.targetWrapper = document.createElement("div")
        this.targetWrapper.style.position = "absolute"
        this.targetWrapper.style.top = "anchor(--mq-render-" + this.id + " start)"
        this.targetWrapper.style.height = this.targetDimensions.y + "px"
        this.targetWrapper.style.width = this.targetDimensions.x + "px"
        this.targetWrapper.style.overflow = "hidden"

        this.target.parentElement?.appendChild(this.targetWrapper)

        this.target.style.anchorName = "--mq-render-" + this.id
        this.target.style.visibility = "hidden"
    }

    private initializeClones() {
        const createClone = () => {
            const newTarget = this.target.cloneNode(true)
            newTarget.style.position = "absolute"
            newTarget.style.visibility = "visible"
            newTarget.style.anchorName = ""
            newTarget.style.display = "inline-block"
            // newTarget.style.border = "2px solid blue"
            this.targetWrapper.appendChild(newTarget)
            this.children.push(newTarget)
            this.childrenProgress.push(0.0)
            return newTarget
        }

        const first = createClone()
        const rect = first.getBoundingClientRect()
        this.contentDimensions = { x: rect.width, y: rect.height }

        if (this.tiled) {
            const xtimes = Math.round(this.targetDimensions.x / this.contentDimensions.x)
            console.log({xtimes})
            for (let i = 0; i < xtimes; i++) {
                createClone()
            }
        }
    }
}