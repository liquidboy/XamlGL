import { PathSegment } from "./PathSegment";
import { Point } from "./../DataTypes/Point";

export class LineSegment extends PathSegment {

    _point: [number,number];
    get Point(): [number, number] { return this._point; }
    set Point(value: [number, number]) { this._point = value; }
}

