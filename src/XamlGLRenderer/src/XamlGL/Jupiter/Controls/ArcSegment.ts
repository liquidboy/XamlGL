import { PathSegment } from "./PathSegment";
import { Point } from "./../../DataTypes/Point";
import { SweepDirection } from "./../../DataTypes/SweepDirection";
import { Size } from "./../../DataTypes/Size";

export class ArcSegment extends PathSegment {

    _point: [number, number];
    _isLargeArc: boolean;
    _rotationAngle: number;
    _sweepDirection: SweepDirection;
    _size: Size;

    get Point(): [number, number] { return this._point; }
    get IsLargeArc(): boolean { return this._isLargeArc; }
    get RotationAngle(): number { return this._rotationAngle; }
    get SweepDirection(): SweepDirection { return this._sweepDirection; }
    get Size(): Size { return this._size; }

    set Point(value: [number, number]) { this._point = value; }
    set IsLargeArc(value: boolean) { this._isLargeArc = value; }
    set RotationAngle(value: number) { this._rotationAngle = value; }
    set SweepDirection(value: SweepDirection) { this._sweepDirection = value; }
    set Size(value: Size) { this._size = value; }
}

