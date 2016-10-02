import * as Jupiter from "./../Jupiter/Core";
import { Thickness } from "./../DataTypes/Thickness";

export class Image extends Jupiter.View {
    private _source: Jupiter.ImageSource;
    private _nineGrid: Thickness;
    private _stretch: Jupiter.Stretch;

    get Source(): Jupiter.ImageSource { return this._source; }
    get NineGrid(): Thickness { return this._nineGrid; }
    get Stretch(): Jupiter.Stretch { return this._stretch; }

    set Source(value: Jupiter.ImageSource) { this._source = value; }
    set NineGrid(value: Thickness) { this._nineGrid = value; }
    set Stretch(value: Jupiter.Stretch) { this._stretch = value; }
}