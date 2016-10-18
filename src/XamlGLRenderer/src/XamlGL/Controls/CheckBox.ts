import { ToggleButton } from "./ToggleButton";
import { Thickness } from "./../DataTypes/Thickness";

export class CheckBox  extends ToggleButton {
    private _checkedPath: string = "M29.403992,0L32,3.5860286 8.3720093,21.479001 5.7740173,17.895017 5.776001,17.893002 0,9.9110087 3.5079956,7.2570179 9.2829895,15.23602z";
    private _uncheckedPath: string = "M1.7000008,1.6999989L1.7000008,30.299999 30.300015,30.299999 30.300015,1.6999989z M0,0L32.000016,0 32.000016,31.999999 0,31.999999z";
    private _checkedPadding: Thickness;
    private _checkedScale: number;

    get CheckedPath(): string { return this._checkedPath; }
    get UncheckedPath(): string { return this._uncheckedPath; }
    get CheckedPadding(): Thickness { return this._checkedPadding; }
    get CheckedScale(): number { return this._checkedScale; }

    set CheckedPath(value: string) { this._checkedPath = value; }
    set UncheckedPath(value: string) { this._uncheckedPath = value; }
    set CheckedPadding(value: Thickness) { this._checkedPadding = value; }
    set CheckedScale(value: number) { this._checkedScale = value; }

    public constructor() {
        super();
        this._checkedPadding = new Thickness(0);
        this._checkedPadding.Left = 1;
        this._checkedPadding.Top = 5;
        this._checkedScale = 1;
    }
}