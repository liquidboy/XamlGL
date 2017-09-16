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

export class SliderRenderer implements BaseRenderer, TextRenderer {

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


    // slidder
    // the vertical space between the number(inside the slider) and the border of the slider box.
    sliderVerticalSpacing: number = 4;
    // the color of the slider background.
    sliderBackgroundColor = [0.16, 0.16, 0.16];
    // the color of the bar in the slider.
    sliderFillColor = [0.0, 0.3, 0.6];
    // the color of the slider background when mouse hover,
    sliderBackgroundColorHover = [0.19, 0.19, 0.19];
    // the color of the bar in the slider when mouse hover.
    sliderFillColorHover = [0.0, 0.3, 0.70];




    _slider(labelStr, value, min, max, doRounding, numDecimalDigits): void {

        this.moveWindowCaret();

        /*
         SLIDER IO
         */

        var sliderPosition = this.windowCaret;
        var widgetId = hashString(labelStr);

        // * if we use the height of a single digit, we know that the slider will always be high enough.
        // (since all digits have equal height in our font).
        // * also, we dynamically determine the slider width, based on the window width.
        var sliderSizes = [
            (this.windowSizes[0] - 2 * this.windowSpacing) * this.widgetHorizontalGrowRatio,
            this._getTextSizes("0")[1] + 2 * this.sliderVerticalSpacing
        ];

        var mouseCollision = this._inBox(sliderPosition, sliderSizes, this.io.mousePositionCur);

        if (
            mouseCollision &&
            this.io.mouseLeftDownCur == true && this.io.mouseLeftDownPrev == false) {
            // if slider is clicked, it becomes active.
            this.activeWidgetId = widgetId;
        }

        if (this.activeWidgetId == widgetId) {
            // if the mouse is clicking on the slider, we modify `value.val` based
            // on the x-position of the mouse.

            var xMax = sliderPosition[0] + sliderSizes[0];
            var xMin = sliderPosition[0];

            /*
             Values larger than xMin and xMax should not overflow or underflow the slider.
             */
            var mouseX = clamp(this.io.mousePositionCur[0], xMin, xMax);

            value.val = (max - min) * ((mouseX - xMin) / (xMax - xMin)) + min;

            if (doRounding)
                value.val = Math.round(value.val);

            this.activeWidgetId = widgetId;

        }

        /*
         If either widget is active, OR we are hovering but not clicking,
         switch to hover color.
         */
        var isHover = (this.activeWidgetId == widgetId) || (mouseCollision && !this.io.mouseLeftDownCur);


        /*
         SLIDER RENDERING
         */

        /*
         Compute slider fill. Measures how much of the slider is filled.
         In range [0,1]
         */
        var sliderFill = (value.val - min) / (max - min);

        var sliderValueStr = value.val.toFixed(doRounding ? 0 : numDecimalDigits);

        this._box(
            sliderPosition,
            sliderSizes, isHover ? this.sliderBackgroundColorHover : this.sliderBackgroundColor, 1);

        /*
         Now fill the slider based on `sliderFill`
         */
        this._box(
            sliderPosition,
            [sliderSizes[0] * sliderFill, sliderSizes[1]],
            isHover ? this.sliderFillColorHover : this.sliderFillColor, 1);

        var sliderValueStrSizes = this._getTextSizes(sliderValueStr);


        // render text in slider
        this._textCenter(sliderPosition, sliderSizes, sliderValueStr);

        // now render slider label.
        var sliderLabelPosition = [sliderPosition[0] + sliderSizes[0] + this.widgetLabelHorizontalSpacing, sliderPosition[1]]
        var sliderLabelStrSizes = [this._getTextSizes(labelStr)[0], sliderSizes[1]];
        this._textCenter(sliderLabelPosition, sliderLabelStrSizes, labelStr);

        this.prevWidgetSizes = [sliderSizes[0] + sliderLabelStrSizes[0], sliderSizes[1]];

    }

    public sliderFloat(str, value, min, max, numDecimalDigits): void {

        if (typeof numDecimalDigits === 'undefined') {
            numDecimalDigits = 2; // default value
        }

        this._slider(str, value, min, max, false, numDecimalDigits);
    };




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
