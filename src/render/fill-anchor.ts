import { MarqueeRenderer } from ".";

export class FillAnchorRenderer implements MarqueeRenderer {
    
    speedY: number = 0.0;
    speedX: number = 0.0;

    private root: HTMLElement;

    constructor(root: HTMLElement) {
        this.root = root;
    }
    
    setup(): void {
        throw new Error("Method not implemented.");
    }
    remove(): void {
        throw new Error("Method not implemented.");
    }
    render(): void {
        throw new Error("Method not implemented.");
    }

}