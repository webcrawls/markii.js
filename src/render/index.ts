export interface MarqueeRenderer {

    setup(): void

    remove(): void
    
}

const createRenderer = (element: HTMLElement) => {
    // const animate = (marquee: MarqueeElement) => {
    //     marquee.progress.x = marquee.speed.x
    //     marquee.progress.y = marquee.progress.y += marquee.speed.y
    
    //     if (marquee.progress.x >= 1.0) marquee.progress.x = 0.0
    //     if (marquee.progress.y >= 1.0) marquee.progress.y = 0.0
    
    //     for (let i = 0; i < marquee.extraChildren.length + 1; i++) {
    //         applyStyle(marquee, i)
    //     }
    // }
    
    // const applyStyle = (marquee: MarqueeElement, index: number) => {
    //     const element = index === 0 ? marquee.realChild : marquee.extraChildren[index - 1]
    //     if (!element) {
    //         console.warn({element})
    //         return
    //     }
    
    //     const transform = `translateY(${Math.round(getElementPosition(marquee, index))}px)`
    //     console.log({transform})
    //     element.style.transform = transform
    // }
    
    // const getElementPosition = (marquee: MarqueeElement, i: number) => {
    //     if (i > marquee.extraChildren.length) return undefined;
    
    //     // the base pos. of the first element (goes from 0 -> parentHeight)
    //     const basePosition = (marquee.progress.y * marquee.dimensions.parent.height)
    
    //     // the position of the element, considering index
    //     const elementPosition = basePosition + (marquee.dimensions.child.height * (i))
    
    //     // now it gets funky
    //     if (elementPosition >= (marquee.dimensions.parent.height)) {
    //         // the height that, when subtracted from elementPosition,
    //         // places it right before the start of the container
    //         return basePosition - (marquee.dimensions.child.height * (marquee.extraChildren.length - i + 1));
    //     }
    
    //     return elementPosition
    // }

    let animationId: number = 0

    const tick = () => {}

    const start = () => {
        animationId = requestAnimationFrame(() => {
            tick(element)
        })
    }
    const stop = () => {}
    
    return {
        element,
        start, stop,
    }
}

export { createRenderer }