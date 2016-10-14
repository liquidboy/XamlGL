import { PathSegmentCollection } from "./PathSegmentCollection";

export class PathFigure {

    _isClosed: boolean;
    _isFilled: boolean;
    _segments: PathSegmentCollection = new PathSegmentCollection();
    _startPoint: [number, number];


    get IsClosed(): boolean { return this._isClosed; }
    get IsFilled(): boolean { return this._isFilled; }
    get Segments(): PathSegmentCollection { return this._segments; }
    get StartPoint(): [number, number] { return this._startPoint; }

    set IsClosed(value: boolean) { this._isClosed = value; }
    set IsFilled(value: boolean) { this._isFilled = value; }
    set Segments(value: PathSegmentCollection){ this._segments = value; }
    set StartPoint(value: [number, number]) { this._startPoint = value; }
}