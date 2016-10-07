export class CornerRadius {
    BottomLeft: number;
    BottomRight: number;
    TopLeft: number;
    TopRight: number;

    constructor(radius: number) {
        this.TopLeft = radius;
        this.TopRight = radius;
        this.BottomRight = radius;
        this.BottomLeft = radius;
    }
}