import * as hashString from 'hash-string';
import * as clamp from 'clamp';
import { Shared } from '../Shared';
import { TitleBar } from './TitleBar';
import { BaseRenderer } from './BaseRenderer';
import { TextRenderer } from './TextRenderer';
import * as createShader from 'gl-shader';
import * as createBuffer from 'gl-buffer';
import * as createTexture from 'gl-texture2d';
import * as mat4 from 'gl-mat4';

export class RadioButtonRenderer implements BaseRenderer, TextRenderer {
    
    // Window
    prevWidgetSizes: any;
    activeWidgetId
    windowCaret: number[];
    windowSizes = [360, 500];
    windowSpacing: number = 14;
    moveWindowCaret: () => void;
    widgetHorizontalGrowRatio: number = 0.6;
    widgetLabelHorizontalSpacing: number = 4;
    io: any;



    /* radioButton settings */
    // the outer color is the color of the outer circle of the radioButton,
    // and the inner color is the color of the inner circle
    radioButtonOuterColor = [0.3, 0.3, 0.3];
    radioButtonInnerColor = [0.15, 0.15, 0.15];
    radioButtonOuterColorHover = [0.33, 0.33, 0.33];
    radioButtonInnerColorHover = [0.18, 0.18, 0.18];
    // in order to render the radio button, we must triangulate the circles into triangle segments
    // this number is the number of triangle segments.
    radioButtonCircleSegments: number = 9;

    // radius of the inner circle will be (height of "0")* innerRadiusRatio
    radioButtonInnerRadius: number = 0.6;
    // radius of the outer circle will be (height of "0")* outerRadiusRatio
    radioButtonOuterRadius: number = 1.0;





    /* If value.val == id, then that means this radio button is chosen. */
    radioButton(labelStr, value, id): void {

        this.moveWindowCaret();

        /*
         Radio button IO
         */


        var zeroHeight = this._getTextSizes("0")[1];


        var innerRadius = (zeroHeight * this.radioButtonInnerRadius);
        var outerRadius = (zeroHeight * this.radioButtonOuterRadius);


        var radioButtonPosition = this.windowCaret;


        var radioButtonSizes = [outerRadius * 2, outerRadius * 2];

        var mouseCollision = this._inCircle(radioButtonPosition, radioButtonSizes, this.io.mousePositionCur);


        if (this.io.mouseLeftDownCur == true && this.io.mouseLeftDownPrev == false && mouseCollision) {
            value.val = id;
        }

        var isHover = mouseCollision;


        /*
         CHECKBOX RENDERING
         */

        this._circle(radioButtonPosition, radioButtonSizes,
            isHover ? this.radioButtonOuterColorHover : this.radioButtonOuterColor, this.radioButtonCircleSegments);


        if (value.val == id) {
            var p = radioButtonPosition;
            var s = radioButtonSizes;
            var innerCirclePosition = [
                Math.round(0.5 * (p[0] + (p[0] + s[0]) - innerRadius * 2)),
                Math.round(0.5 * (p[1] + (p[1] + s[1]) - innerRadius * 2)),
            ];

            this._circle(innerCirclePosition, [innerRadius * 2, innerRadius * 2],
                isHover ? this.radioButtonInnerColorHover : this.radioButtonInnerColor, this.radioButtonCircleSegments);
        }


        // now render radio button label.
        var labelPosition = [radioButtonPosition[0] + radioButtonSizes[0] + this.widgetLabelHorizontalSpacing, radioButtonPosition[1]]
        var labelStrSizes = [this._getTextSizes(labelStr)[0], radioButtonSizes[1]];
        this._textCenter(labelPosition, labelStrSizes, labelStr);

        this.prevWidgetSizes = [radioButtonSizes[0] + labelStrSizes[0], radioButtonSizes[1]];
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
