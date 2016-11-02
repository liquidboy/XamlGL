import { Geometry } from "./../Geometry";
import { FillRule } from "./../../DataTypes/FillRule";
import { PathFigureCollection } from "./PathFigureCollection";

export class PathGeometry extends Geometry {


    _figures: PathFigureCollection = new PathFigureCollection();
    _fillRule: FillRule;

    get Figures(): PathFigureCollection { return this._figures; }
    get FillRule(): FillRule { return this._fillRule; }

    set Figures(value: PathFigureCollection) { this._figures = value; }
    set FillRule(value: FillRule) { this._fillRule = value; }
}