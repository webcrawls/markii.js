export interface MarqueeRenderer {

    speedX: number
    speedY: number

    setup(): void

    remove(): void

    render(): void
    
}