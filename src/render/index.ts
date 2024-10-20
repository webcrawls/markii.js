let rendererCount = 0

export const getId = () => {return ++rendererCount}

export interface MarqueeRenderer {

    speedX: number
    speedY: number

    progressX: number
    progressY: number

    tiled: boolean

    setup(): void

    remove(): void

    render(): void
    
}