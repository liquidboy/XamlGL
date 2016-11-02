import { PathSegment } from "./PathSegment";
import { Point } from "./../../DataTypes/Point";

export class BezierSegment extends PathSegment {

    _point1: [number, number];
    _point2: [number, number];
    _point3: [number, number];
    get Point1(): [number, number] { return this._point1; }
    get Point2(): [number, number] { return this._point2; }
    get Point3(): [number, number] { return this._point3; }
    set Point1(value: [number, number]) { this._point1 = value; }
    set Point2(value: [number, number]) { this._point2 = value; }
    set Point3(value: [number, number]) { this._point3 = value; }
}

