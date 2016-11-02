import { IconElement } from "./../IconElement";

export class PathIcon extends IconElement {

    private _geometry: string;

    get Geometry(): string { return this._geometry; }

    set Geometry(value: string) { this._geometry = value; }

    constructor() {
        super();

        this.Foreground = "";
    }
}