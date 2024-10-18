import { SketchyRenderer } from './render/sketchy'

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

const createMarquee = (element: HTMLElement): MarqueeElement => {
    let animationId: number = 0

    const renderer = new SketchyRenderer(element)
    renderer.speedX = 1.0
    renderer.speedY = 1.0

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

// const createMarquee = (root: HTMLElement) => {
//     const attributes = parseAttributes(root)
//     const dimensions = parseDimensions(root)

//     const m: MarqueeElement = {
//         root,
//         paused: false,
//         progress: {x: 0, y: 0},
//         ...attributes,
//         dimensions
//     }

//     setupExtraChildren(m)

//     const mutationObserver = new MutationObserver(
//         (mutations, observer) => {
//             // observeMutations(root)
//         })

//     const resizeObserver = new ResizeObserver(
//         (entries, observer) => {
//             m.dimensions = parseDimensions(root)
//             // setupExtraChildren(m)
//             console.log({m})
//         })

//     resizeObserver.observe(root)

//     marquees = [...marquees, m]
// }

// const deleteMarquee = (marquee: MarqueeElement) => {
//     marquees = marquees.filter(m => m !== marquee)
// }

// const parseDimensions = (root: HTMLElement): {
//     parent: { width: number, height: number },
//     child: { width: number, height: number }
// } => {
//     const rootRect = root.getBoundingClientRect()
//     const parent = {width: rootRect.width, height: rootRect.height}

//     const childRect = getRealChild(root).getBoundingClientRect()
//     const child = {width: childRect.width, height: childRect.height}

//     return {parent, child}
// }

// const parseAttributes = (root: HTMLElement): { speed: { x: number, y: number } } => {
//     const speed = {
//         x: parseFloat(root.getAttribute(DATA_MARQUEE_X_SPEED) ?? "0"),
//         y: parseFloat(root.getAttribute(DATA_MARQUEE_Y_SPEED) ?? "0")
//     }

//     if (speed.x === 0 && speed.y === 0) {
//         throw new Error("initMarquee#HTMLElement was called for an element with no speed x/y!")
//     }

//     return {speed}
// }

// const setupExtraChildren = (marquee: MarqueeElement) => {
//     const requiredElements = Math.floor(marquee.dimensions.parent.height / marquee.dimensions.child.height) + 1

//     const realChild = getRealChild(marquee.root)
//     initStyles(realChild)

//     let newChildren = []

//     for (let i = 0; i < requiredElements; i++) {
//         const newChild: HTMLElement = realChild.cloneNode(true)
//         newChild.setAttribute(DATA_MARQUEE_EXTRA, i.toString())
//         marquee.root.appendChild(newChild)
//         newChildren = [...newChildren, newChild]
//         initStyles(newChild)
//     }

//     marquee.realChild = realChild
//     marquee.extraChildren = (newChildren)
// }

// const initStyles = (child: HTMLElement) => {
//     child.style.position = "absolute"
//     child.style.top = "0px"
//     child.style.left = "0px"
// }

// const getRealChild = (root: HTMLElement): HTMLElement => {
//     if (root.childElementCount === 0) {
//         throw new Error("getRealChild#HTMLElement was given an element with zero children!")
//     }

//     let realChildren = []

//     for (const child of root.children) {
//         if (child.hasAttribute(DATA_MARQUEE_EXTRA)) continue;
//         realChildren = [...realChildren, child]
//     }

//     if (realChildren.length === 0) {
//         throw new Error("getRealChild#HTMLElement couldn't find any 'real' children!")
//     }

//     return realChildren[0]
// }

// export {createMarquee, deleteMarquee}