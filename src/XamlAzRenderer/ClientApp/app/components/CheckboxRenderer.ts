import * as hashString from 'hash-string';
import * as clamp from 'clamp';
import { Shared } from '../Shared';
import { TitleBar } from './TitleBar';
import { TextRenderer } from './TextRenderer';
import { BaseRenderer } from './BaseRenderer';
import * as createShader from 'gl-shader';
import * as createBuffer from 'gl-buffer';
import * as createTexture from 'gl-texture2d';
import * as mat4 from 'gl-mat4';

export class CheckboxRenderer implements BaseRenderer, TextRenderer {

    // main
    prevWidgetSizes: any;
    activeWidgetId
    windowCaret: number[];
    _moveWindowCaret: () => void;
    io: any;
    widgetLabelHorizontalSpacing: number = 4;


    // checkbox
    // the outer color is the color of the outer box of the checkbox,
    // and the inner color is the color of the inner box
    checkboxOuterColor = [0.3, 0.3, 0.3];
    checkboxInnerColor = [0.15, 0.15, 0.15];
    checkboxOuterColorHover = [0.33, 0.33, 0.33];
    checkboxInnerColorHover = [0.18, 0.18, 0.18];
    // size of inner box will be (height of "0")* checkBoxInnerSizeRatio
    checkBoxInnerSizeRatio: number = 1.4;
    // size of outer box will be (height of "0")* checkBoxOuterSizeRatio
    checkBoxOuterSizeRatio: number = 2.0;


    checkbox(labelStr, value): void {

        this._moveWindowCaret();

        /*
         CHECKBOX IO(if checkbox clicked, flip boolean value.)
         */

        // use height of zero to determine size of checkbox, to ensure that the textl label does become higher
        // than the checkbox.
        var zeroHeight = this._getTextSizes("0")[1];


        var innerSize = zeroHeight * this.checkBoxInnerSizeRatio;
        var outerSize = zeroHeight * this.checkBoxOuterSizeRatio;

        var checkboxPosition = this.windowCaret;
        var checkboxSizes = [outerSize, outerSize];

        var mouseCollision = this._inBox(checkboxPosition, checkboxSizes, this.io.mousePositionCur);

        if (this.io.mouseLeftDownCur == true && this.io.mouseLeftDownPrev == false && mouseCollision) {
            value.val = !value.val;
        }

        var isHover = mouseCollision;

        /*
         CHECKBOX RENDERING
         */

        // render outer box.
        this._box(
            checkboxPosition,
            checkboxSizes, isHover ? this.checkboxOuterColorHover : this.checkboxOuterColor, 1);


        // now render a centered inner box, that shows whether the checkbox is true, or false.

        if (value.val) {
            var p = checkboxPosition;
            var s = checkboxSizes;
            var innerboxPosition = [
                Math.round(0.5 * (p[0] + (p[0] + s[0]) - innerSize)),
                Math.round(0.5 * (p[1] + (p[1] + s[1]) - innerSize)),
            ];

            this._box(
                innerboxPosition,
                [innerSize, innerSize], isHover ? this.checkboxInnerColorHover : this.checkboxInnerColor, 1);
        }

        // now render checkbox label.
        var labelPosition = [checkboxPosition[0] + checkboxSizes[0] + this.widgetLabelHorizontalSpacing, checkboxPosition[1]]
        var labelStrSizes = [this._getTextSizes(labelStr)[0], checkboxSizes[1]];
        this._textCenter(labelPosition, labelStrSizes, labelStr);

        this.prevWidgetSizes = [checkboxSizes[0] + labelStrSizes[0], checkboxSizes[1]];
    }



    // TextRenderer
    textScale: number;
    _text: (position, str) => void;
    _textCenter: (p, s, str) => void;
    textLine: (str) => void;
    _getTextSizes: (str) => [number, number];
    _getCharDesc: (char) => any;


    // BaseRenderer
    indexBuffer = [];
    indexBufferIndex: number = 0;
    uvBuffer = [];
    uvBufferIndex: number = 0;
    positionBuffer = [];
    positionBufferIndex: number = 0;
    colorBuffer = [];
    colorBufferIndex: number = 0;
    _addIndex: (index) => void;
    _addPosition: (position) => void;
    _addColor: (color) => void;
    _addUv: (uv) => void;
    _coloredVertex: (position, color) => void;
    _box: (position: number[], size: number[], color: number[], alpha: number) => void;
    _circle: (position, sizes, color, segments) => void
    _unitCircle: (position, theta, radius) => [number, number];
    _inCircle: (p, s, x) => boolean;
    _inBox: (p, s, x) => boolean;
}
