import { FrameworkElement } from "./FrameworkElement";

export class Shape extends FrameworkElement {
    private _fill: string;
    private _stroke: string;
    private _strokeThickness: number;

    get Fill(): string { return this._fill; }
    get Stroke(): string { return this._stroke; }
    get StrokeThickness(): number { return this._strokeThickness; }

    set Fill(value: string) { this._fill = value; }
    set Stroke(value: string) { this._stroke = value; }
    set StrokeThickness(value: number) { this._strokeThickness = value; }

    constructor() {
        super();

        this.Fill = "#FFFFFFFF";
        this.Stroke = "#FF000000";
        this.StrokeThickness = 1;
    }
}