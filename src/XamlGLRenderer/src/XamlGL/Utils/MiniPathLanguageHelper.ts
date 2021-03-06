﻿import { PathGeometry } from "./../Jupiter/Controls/PathGeometry";
import { PathFigure } from "./../Jupiter/Controls/PathFigure";
import { LineSegment } from "./../Jupiter/Controls/LineSegment";
import { BezierSegment } from "./../Jupiter/Controls/BezierSegment";
import { QuadraticBezierSegment } from "./../Jupiter/Controls/QuadraticBezierSegment";
import { ArcSegment } from "./../Jupiter/Controls/ArcSegment";
import { FillRule } from "./../DataTypes/FillRule";
import { SweepDirection } from "./../DataTypes/SweepDirection";
import { Size } from "./../DataTypes/Size";
import { ConsoleHelper } from "./ConsoleHelper";

export class MiniPathLanguageHelper {

    static AllowSign: boolean = true;
    static AllowComma: boolean = true;
    static IsFilled: boolean = true;
    static IsClosed: boolean = true;

    static _figure: PathFigure = null;     // figure object, which will accept parsed segments
    static _pathString: string;        // input string to be parsed
    static _pathLength: number;
    static _curIndex: number;          // location to read next character from
    static _figureStarted: boolean;     // startFigure is effective 

    static _lastStart: [number, number];         // last figure starting point
    static _lastPoint: [number, number];         // last point 
    static _secondLastPoint: [number, number];   // the point before last point

    static _token: string;             // non whitespace character returned by ReadToken

    static parse(path: string, context: PIXI.Graphics): PathGeometry {
        let _pathGeometry: PathGeometry = null;


        this._pathString = path;
        this._pathLength = path.length;
        this._curIndex = 0;

        this._secondLastPoint = [0, 0];
        this._lastPoint = [0, 0];
        this._lastStart = [0, 0];

        this._figureStarted = false;

        let first: boolean = true;

        let last_cmd: string = " ";

        while (this.ReadToken()) { // empty path is allowed in XAML
            let cmd: string = this._token;

            if (first) {
                if ((cmd !== "M") && (cmd !== "m") && (cmd !== "f") && (cmd !== "F")) { // path starts with M|m 
                    this.ThrowBadToken();
                }

                first = false;
            }

            switch (cmd) {
                case "f":
                case "F":
                    _pathGeometry = new PathGeometry();
                    let _num: number = this.ReadNumber(!this.AllowComma);
                    _pathGeometry.FillRule = _num === 0 ? FillRule.EvenOdd : FillRule.Nonzero;
                    break;

                case "m":
                case "M":
                    // xAML allows multiple points after M/m
                    this._lastPoint = this.ReadPoint(cmd, !this.AllowComma);

                    this._figure = new PathFigure();
                    this._figure.StartPoint = this._lastPoint;
                    this._figure.IsFilled = this.IsFilled;
                    this._figure.IsClosed = !this.IsClosed;
                    // context.BeginFigure(_lastPoint, IsFilled, !IsClosed);
                    context.moveTo(this._lastPoint[0], this._lastPoint[1]);
                    ConsoleHelper.LogPad("M " + this._lastPoint[0] + " " + this._lastPoint[1], 5);
                    this._figureStarted = true;
                    this._lastStart = this._lastPoint;

                    while (this.IsNumber(this.AllowComma)) {
                        this._lastPoint = this.ReadPoint(cmd, !this.AllowComma);

                        let _lineSegment: LineSegment = new LineSegment();
                        _lineSegment.Point = this._lastPoint;
                        this._figure.Segments.add(_lineSegment);
                        context.lineTo(this._lastPoint[0], this._lastPoint[1]);
                        ConsoleHelper.LogPad("L " + this._lastPoint[0] + " " + this._lastPoint[1], 5);
                        // context.LineTo(_lastPoint, IsStroked, !IsSmoothJoin);
                        last_cmd = "L";
                    }
                    break;

                case "l":
                case "L":
                case "h":
                case "H":
                case "v":
                case "V":
                    this.EnsureFigure();

                    do {
                        switch (cmd) {
                            case "l": this._lastPoint = this.ReadPoint(cmd, !this.AllowComma); break;
                            case "L": this._lastPoint = this.ReadPoint(cmd, !this.AllowComma); break;
                            case "h": this._lastPoint[0] += this.ReadNumber(!this.AllowComma); break;
                            case "H": this._lastPoint[0] = this.ReadNumber(!this.AllowComma); break;
                            case "v": this._lastPoint[1] += this.ReadNumber(!this.AllowComma); break;
                            case "V": this._lastPoint[1] = this.ReadNumber(!this.AllowComma); break;
                        }

                        let _lineSegment: LineSegment = new LineSegment();
                        _lineSegment.Point = this._lastPoint;
                        this._figure.Segments.add(_lineSegment);

                        context.lineTo(this._lastPoint[0], this._lastPoint[1]);
                        ConsoleHelper.LogPad("L " + this._lastPoint[0] + " " + this._lastPoint[1], 5);
                        // context.LineTo(_lastPoint, IsStroked, !IsSmoothJoin);
                    }
                    while (this.IsNumber(this.AllowComma));

                    last_cmd = "L";
                    break;

                case "c":
                case "C": // cubic Bezier 
                case "s":
                case "S": // smooth cublic Bezier
                    this.EnsureFigure();

                    do {
                        let p: [number, number];

                        if ((cmd === "s") || (cmd === "S")) {
                            if (last_cmd === "C") {
                                p = this.Reflect();
                            } else {
                                p = this._lastPoint;
                            }

                            this._secondLastPoint = this.ReadPoint(cmd, !this.AllowComma);
                        } else {
                            p = this.ReadPoint(cmd, !this.AllowComma);

                            this._secondLastPoint = this.ReadPoint(cmd, this.AllowComma);
                        }

                        this._lastPoint = this.ReadPoint(cmd, this.AllowComma);

                        let _bizierSegment: BezierSegment = new BezierSegment();
                        _bizierSegment.Point1 = p;
                        _bizierSegment.Point2 = this._secondLastPoint;
                        _bizierSegment.Point3 = this._lastPoint;
                        this._figure.Segments.add(_bizierSegment);
                        // context.BezierTo(p, _secondLastPoint, _lastPoint, IsStroked, !IsSmoothJoin);
                        context.bezierCurveTo(_bizierSegment.Point1[0], _bizierSegment.Point1[1], _bizierSegment.Point2[0],
                            _bizierSegment.Point2[1], _bizierSegment.Point3[0], _bizierSegment.Point3[1]);
                        ConsoleHelper.LogPad("B " + _bizierSegment.Point1[0] + " " + _bizierSegment.Point1[1] + " " +
                            _bizierSegment.Point2[0] + " " +
                            _bizierSegment.Point2[1] + " " + _bizierSegment.Point3[0] + " " + _bizierSegment.Point3[1], 5);
                        last_cmd = "C";
                    }
                    while (this.IsNumber(this.AllowComma));

                    break;

                case "q":
                case "Q": // quadratic Bezier 
                case "t":
                case "T": // smooth quadratic Bezier
                    this.EnsureFigure();

                    do {
                        if ((cmd === "t") || (cmd === "T")) {
                            if (last_cmd === "Q") {
                                this._secondLastPoint = this.Reflect();
                            } else {
                                this._secondLastPoint = this._lastPoint;
                            }

                            this._lastPoint = this.ReadPoint(cmd, !this.AllowComma);
                        } else {
                            this._secondLastPoint = this.ReadPoint(cmd, !this.AllowComma);
                            this._lastPoint = this.ReadPoint(cmd, this.AllowComma);
                        }

                        let _quadraticBezierSegment: QuadraticBezierSegment = new QuadraticBezierSegment();
                        _quadraticBezierSegment.Point1 = this._secondLastPoint;
                        _quadraticBezierSegment.Point2 = this._lastPoint;
                        this._figure.Segments.add(_quadraticBezierSegment);
                        // context.QuadraticBezierTo(_secondLastPoint, _lastPoint, IsStroked, !IsSmoothJoin);
                        context.quadraticCurveTo(_quadraticBezierSegment.Point1[0], _quadraticBezierSegment.Point1[1],
                            _quadraticBezierSegment.Point2[0], _quadraticBezierSegment.Point2[1]);
                        ConsoleHelper.LogPad("B " + _quadraticBezierSegment.Point1[0] + " " + _quadraticBezierSegment.Point1[1] + " " +
                            _quadraticBezierSegment.Point2[0] + " " + _quadraticBezierSegment.Point2[1], 5);
                        last_cmd = "Q";
                    }
                    while (this.IsNumber(this.AllowComma));

                    break;

                case "a":
                case "A":
                    this.EnsureFigure();

                    do {
                        // a 3,4 5, 0, 0, 6,7
                        let w: number = this.ReadNumber(!this.AllowComma);
                        let h: number = this.ReadNumber(this.AllowComma);
                        let rotation: number = this.ReadNumber(this.AllowComma);
                        let large: boolean = this.ReadBool();
                        let sweep: boolean = this.ReadBool();

                        this._lastPoint = this.ReadPoint(cmd, this.AllowComma);

                        let _arcSegment: ArcSegment = new ArcSegment();
                        _arcSegment.Point = this._lastPoint;
                        _arcSegment.Size = new Size(w, h);
                        _arcSegment.RotationAngle = rotation;
                        _arcSegment.IsLargeArc = large;
                        _arcSegment.SweepDirection = sweep ? SweepDirection.Clockwise : SweepDirection.Counterclockwise;
                        this._figure.Segments.add(_arcSegment);
                        // context.ArcTo(
                        //    _lastPoint,
                        //    new Size(w, h),
                        //    rotation,
                        //    large,
                        //    sweep ? SweepDirection.Clockwise : SweepDirection.Counterclockwise,
                        //    isStroked,
                        //    !IsSmoothJoin
                        //    );
                        context.arcTo(this._lastPoint[0], this._lastPoint[1], this._lastPoint[0] + w, this._lastPoint[1] + h, rotation);
                        ConsoleHelper.LogPad("A " + this._lastPoint[0] + " " + this._lastPoint[1] + " "
                            + (this._lastPoint[0] + w) + " " + (this._lastPoint[1] + h) + " " + rotation, 5);
                    }
                    while (this.IsNumber(this.AllowComma));

                    last_cmd = "A";
                    break;

                case "z":
                case "Z":
                    this.EnsureFigure();
                    this._figure.IsClosed = this.IsClosed;
                    // context.SetClosedState(IsClosed);

                    this._figureStarted = false;
                    last_cmd = "Z";

                    this._lastPoint = this._lastStart; // set reference point to be first point of current figure
                    context.lineTo(this._lastPoint[0], this._lastPoint[1]);
                    ConsoleHelper.LogPad("Z ", 5);
                    break;

                default:
                    this.ThrowBadToken();
                    break;
            }

            if (null != this._figure) {
                if (this._figure.IsClosed) {
                    if (null == _pathGeometry) {
                        _pathGeometry = new PathGeometry();
                    }

                    _pathGeometry.Figures.add(this._figure);

                    this._figure = null;
                    first = true;
                }
            }



        }

        if (null != this._figure) {
            if (null == _pathGeometry) {
                _pathGeometry = new PathGeometry();
            }

            if (!_pathGeometry.Figures.contains(this._figure)) {
                _pathGeometry.Figures.add(this._figure);
            }

        }
        return _pathGeometry;
    }

    static SkipDigits(signAllowed: boolean): void {
        // allow for a sign 
        if (signAllowed && this.More() && ((this._pathString[this._curIndex] === "-") || this._pathString[this._curIndex] === "+")) {
            this._curIndex++;
        }

        while (this.More() && (this._pathString[this._curIndex] >= "0") && (this._pathString[this._curIndex] <= "9")) {
            this._curIndex++;
        }
    }

    static ReadBool(): boolean {
        this.SkipWhiteSpace(this.AllowComma);

        if (this.More()) {
            this._token = this._pathString[this._curIndex++];

            if (this._token === "0") {
                return false;
            } else if (this._token === "1") {
                return true;
            }
        }

        this.ThrowBadToken();

        return false;
    }

    static Reflect(): [number, number] {
        return [2 * this._lastPoint[0] - this._secondLastPoint[0],
        2 * this._lastPoint[1] - this._secondLastPoint[1]];
    }

    static EnsureFigure(): void {
        if (!this._figureStarted) {
            this._figure = new PathFigure();
            this._figure.StartPoint = this._lastStart;

            // _context.BeginFigure(_lastStart, IsFilled, !IsClosed);
            this._figureStarted = true;
        }
    }

    static ReadNumber(allowComma: boolean): number {
        if (!this.IsNumber(allowComma)) {
            this.ThrowBadToken();
        }

        let simple: boolean = true;
        let start: number = this._curIndex;

        //
        // allow for a sign
        //
        // there are numbers that cannot be preceded with a sign, for instance, -NaN, but it"s 
        // fine to ignore that at this point, since the CLR parser will catch this later.
        // 
        if (this.More() && ((this._pathString[this._curIndex] === "-") || this._pathString[this._curIndex] === "+")) {
            this._curIndex++;
        }

        // check for Infinity (or -Infinity).
        if (this.More() && (this._pathString[this._curIndex] === "I")) {
            // 
            // don't bother reading the characters, as the CLR parser will 
            // do this for us later.
            // 
            this._curIndex = Math.min(this._curIndex + 8, this._pathLength); // "Infinity" has 8 characters
            simple = false;
        } else if (this.More() && (this._pathString[this._curIndex] === "N")) {
            // check for NaN

            // 
            // don't bother reading the characters, as the CLR parser will
            // do this for us later. 
            //
            this._curIndex = Math.min(this._curIndex + 3, this._pathLength); // "NaN" has 3 characters
            simple = false;
        } else {
            this.SkipDigits(!this.AllowSign);

            // optional period, followed by more digits 
            if (this.More() && (this._pathString[this._curIndex] === ".")) {
                simple = false;
                this._curIndex++;
                this.SkipDigits(!this.AllowSign);
            }

            // exponent
            if (this.More() && ((this._pathString[this._curIndex] === "E") || (this._pathString[this._curIndex] === "e"))) {
                simple = false;
                this._curIndex++;
                this.SkipDigits(this.AllowSign);
            }
        }

        if (simple && (this._curIndex <= (start + 8))) {
            // 32-bit integer
            let sign: number = 1;

            if (this._pathString[start] === "+") {
                start++;
            } else if (this._pathString[start] === "-") {
                start++;
                sign = -1;
            }

            let value: number = 0;

            while (start < this._curIndex) {
                value = value * 10 + parseFloat(this._pathString[start]);  // (this._pathString[start] - '0');
                // console.log(this._pathString[start]);
                start++;
            }
            return value * sign;
        } else {
            let subString: string = this._pathString.substr(start, this._curIndex - start);
            return parseFloat(subString);
        }
    }

    static IsNumber(allowComma: boolean): boolean {
        let commaMet: boolean = this.SkipWhiteSpace(allowComma);

        if (this.More()) {
            this._token = this._pathString[this._curIndex];

            // valid start of a number
            if ((this._token === ".") || (this._token === "-") || (this._token === "+") || ((this._token >= "0") && (this._token <= "9"))
                || (this._token === "I")  // infinity
                || (this._token === "N")) { // naN
                return true;
            }
        }

        if (commaMet) { // only allowed between numbers
            this.ThrowBadToken();
        }

        return false;
    }

    static ReadPoint(cmd: string, allowcomma: boolean): [number, number] { // point 
        let x: number = this.ReadNumber(this.AllowComma);
        let y: number = this.ReadNumber(this.AllowComma);

        if (cmd >= "a") { // "A" < "a". lower case for relative
            x += this._lastPoint[0];
            y += this._lastPoint[1];
        }

        return [x, y];
    }

    static ReadToken(): boolean {
        this.SkipWhiteSpace(!this.AllowComma);

        // check for end of string 
        if (this.More()) {
            this._token = this._pathString[this._curIndex++];

            return true;
        } else {
            return false;
        }
    }

    static More(): boolean {
        return this._curIndex < this._pathLength;
    }

    static SkipWhiteSpace(allowComma: boolean): boolean {
        let commaMet: boolean = false;

        while (this.More()) {
            let ch: string = this._pathString[this._curIndex];

            switch (ch) {
                case " ":
                case "\n":
                case "\r":
                case "\t": // sVG whitespace 
                    break;

                case ",":
                    if (allowComma) {
                        commaMet = true;
                        allowComma = false; // one comma only
                    } else {
                        this.ThrowBadToken();
                    }
                    break;

                default:
                    // avoid calling IsWhiteSpace for ch in (" " .. "z"]
                    if (((ch > " ") && (ch <= "z")) || !(ch === " ")) {
                        return commaMet;
                    }
                    break;
            }

            this._curIndex++;
        }

        return commaMet;
    }

    static ThrowBadToken(): void {
        // throw new FormatException(string.Format("Unexpected character in path "{0}" at position {1}", _pathString, _curIndex - 1));
    }
}