import { MarqueeRenderer } from ".";

export class SketchyRenderer implements MarqueeRenderer {

    private element: HTMLElement
    private progressX = 0.0;
    private progressY = 0.0;

    speedX;
    speedY;

    constructor(element: HTMLElement) {
        this.element = element
    }

    setup(): void {

    }

    remove(): void {

    }
    
}