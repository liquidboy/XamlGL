export interface ICornerRadius {
    TopLeft: number;
    TopRight: number;
    BottomRight: number;
    BottomLeft: number;
}

export class CornerRadius {
    BottomLeft: number;
    BottomRight: number;
    TopLeft: number;
    TopRight: number;

    constructor(radius: ICornerRadius);
    constructor(radius?: any) {
        this.TopLeft = radius && radius.TopLeft ? radius.TopLeft : radius;
        this.TopRight = radius && radius.TopRight ? radius.TopRight : radius;
        this.BottomRight = radius && radius.BottomRight ? radius.BottomRight : radius;
        this.BottomLeft = radius && radius.BottomLeft ? radius.BottomLeft : radius;
    }
}