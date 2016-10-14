import { DependencyObject } from "./DependencyObject";
import { Guid } from "./../DataTypes/Guid";

export class Geometry extends DependencyObject {
    private _uniqueId: string;

    get UniqueID(): string { return this._uniqueId; }

    set UniqueID(value: string) { this._uniqueId = value; }

    constructor() {
        super();
        this._uniqueId = Guid.newGuid();
    }
}