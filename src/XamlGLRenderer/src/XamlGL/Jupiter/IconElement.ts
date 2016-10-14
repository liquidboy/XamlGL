import { FrameworkElement } from "./FrameworkElement";

export class IconElement extends FrameworkElement {
    private _foreground: string;

    get Foreground(): string { return this._foreground; }

    set Foreground(value: string) { this._foreground = value; }

    constructor() {
        super();

        this.Foreground = "#FFFFFFFF";
    }
}