import { IconElement } from "./../Jupiter/IconElement";
// import { Thickness } from "./../DataTypes/Thickness";
// import { CornerRadius } from "./../DataTypes/CornerRadius";
// import { HorizontalAlignment } from "./../DataTypes/HorizontalAlignment";
// import { VerticalAlignment } from "./../DataTypes/VerticalAlignment";

export class PathIcon extends IconElement {

    private _geometry: string;

    get Geometry(): string { return this._geometry; }

    set Geometry(value: string) { this._geometry = value; }

    constructor() {
        super();

        this.Foreground = "";
    }
}