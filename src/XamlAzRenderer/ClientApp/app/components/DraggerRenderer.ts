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

export class DraggerRenderer implements BaseRenderer {



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


    // draggerrenderer
    // the horizontal spacing between the subdragger widgets in a dragger widget.
    draggerWidgetHorizontalSpacing: number = 3;
    // the vertical spacing between the top and bottom borders and the text in draggers.
    draggerVerticalSpacing: number = 5;

    // The colors of the three subdraggers in the rgbDragger widget.
    // "Hover", refers to the color when the dragger is hovered.
    draggerRgbRedColor = [0.3, 0.0, 0.0];
    draggerRgbRedColorHover = [0.35, 0.0, 0.0];
    draggerRgbGreenColor = [0.0, 0.3, 0.0];
    draggerRgbGreenColorHover = [0.0, 0.35, 0.0];
    draggerRgbBlueColor = [0.0, 0.0, 0.3];
    draggerRgbBlueColorHover = [0.0, 0.0, 0.38];
    //The colors of the subdraggers in the draggerFloat widgets.
    // "Hover", refers to the color when the dragger is hovered.
    draggerFloatColor = [0.30, 0.30, 0.30];
    draggerFloatColorHover = [0.32, 0.32, 0.32];





    /*
     sublabels,
     min max, for all n.
     hover color, for all three.
     */
    _draggerFloatN(labelStr: string, value: number[], N: number, minMaxValues, subLabels, colors): void {
        this.moveWindowCaret();

        if (!minMaxValues)
            minMaxValues = [];

        if (!subLabels)
            subLabels = [];

        if (!colors)
            colors = [];


        // if minMaxValues is only a single min-max pair(a  n array on the form [min,max]),
        // then that pair becomes the value of the rest
        // of the min-max pairs.
        if (minMaxValues.length == 2 && typeof minMaxValues[0][0] == "undefined") {
            var defaultValue = [minMaxValues[0], minMaxValues[1]];
            for (var i = 0; i < N; ++i) {
                minMaxValues[i] = defaultValue;
            }


        }


        /*
         Set default values of arguments
         */
        for (var i = 0; i < N; ++i) {
            if (!subLabels[i]) {
                subLabels[i] = "";
            }

            if (!minMaxValues[i]) {
                minMaxValues[i] = [-1, 1];
            }

            if (!colors[i]) {
                colors[i] = [this.draggerFloatColor, this.draggerFloatColorHover];

            }
        }

        // width of a single subdragger.
        var draggerWidth =
            (((this.windowSizes[0] - 2 * this.windowSpacing) * (this.widgetHorizontalGrowRatio)) - (N - 1) * this.draggerWidgetHorizontalSpacing) / (N);

        let nDraggerPosition: number[] = this.windowCaret;
        let formerDraggerPosition: any = { topRight: nDraggerPosition };

        for (var iDragger = 0; iDragger < N; ++iDragger) {
            var v = { val: value[iDragger] };

            // first dragger has no spacing in front.
            var hasFrontSpacing = (iDragger == 0) ? false : true;

            var position = [
                formerDraggerPosition.topRight[0] + (hasFrontSpacing ? this.draggerWidgetHorizontalSpacing : 0),
                formerDraggerPosition.topRight[1]];

            // make sure each subdragger has an unique widget-ID.
            var draggerWidgetId = hashString(labelStr + (iDragger + ""));

            formerDraggerPosition = this._draggerFloat(draggerWidgetId, subLabels[iDragger], v,
                colors[iDragger][0],
                colors[iDragger][1], draggerWidth, position, minMaxValues[iDragger][0], minMaxValues[iDragger][1]);

            // update value
            value[iDragger] = v.val;
        }

        // the total size of all the N draggers.
        var draggerSizes = [
            formerDraggerPosition.bottomRight[0] - nDraggerPosition[0],
            formerDraggerPosition.bottomRight[1] - nDraggerPosition[1]];

        // finally, we place a label after all the draggers.
        var draggerLabelPosition = [nDraggerPosition[0] + draggerSizes[0] + this.widgetLabelHorizontalSpacing, nDraggerPosition[1]]
        var draggerLabelStrSizes = [this._getTextSizes(labelStr)[0], draggerSizes[1]];
        this._textCenter(draggerLabelPosition, draggerLabelStrSizes, labelStr);

        this.prevWidgetSizes = [
            draggerSizes[0] + this.widgetLabelHorizontalSpacing + draggerLabelStrSizes[0],
            draggerSizes[1]];
    }

    draggerRgb(labelStr: string, value: number[]): void {
        this._draggerFloatN(
            labelStr, value, 3, [0, 1], ["R:", "G:", "B:"],
            [
                [this.draggerRgbRedColor, this.draggerRgbRedColorHover],
                [this.draggerRgbGreenColor, this.draggerRgbGreenColorHover],
                [this.draggerRgbBlueColor, this.draggerRgbBlueColorHover]
            ]);
    };

    draggerFloat2(labelStr, value, minMaxValues, subLabels): void {
        this._draggerFloatN(labelStr, value, 2, minMaxValues, subLabels, null);
    };

    draggerFloat3(labelStr, value, minMaxValues, subLabels): void {
        this._draggerFloatN(labelStr, value, 3, minMaxValues, subLabels, null);
    };

    _draggerFloat(widgetId, labelStr, value, color, colorHover, width, position, minVal, maxVal): any {

        /*
        DRAGGER IO
         */

        var draggerPosition = position;
        var draggerSizes = [
            width,
            this._getTextSizes("0")[1] + 2 * this.draggerVerticalSpacing
        ];

        var mouseCollision = this._inBox(draggerPosition, draggerSizes, this.io.mousePositionCur);
        if (
            mouseCollision &&
            this.io.mouseLeftDownCur == true && this.io.mouseLeftDownPrev == false) {
            // if slider is clicked, it becomes active.
            this.activeWidgetId = widgetId;
        }

        if (this.activeWidgetId == widgetId) {
            value.val += 0.01 * (this.io.mousePositionCur[0] - this.io.mousePositionPrev[0]);
            value.val = clamp(value.val, minVal, maxVal);

            this.activeWidgetId = widgetId;

        }

        /*
         DRAGGER RENDERING
         */
        var sliderValueNumDecimalDigits = 2; // hardcode this value for now.
        var sliderValueStr = labelStr + value.val.toFixed(sliderValueNumDecimalDigits);


        /*
         If either widget is active, OR we are hovering but not clicking,
         switch to hover color.
         */
        var isHover = (this.activeWidgetId == widgetId) || (mouseCollision && !this.io.mouseLeftDownCur);

        this._box(
            draggerPosition,
            draggerSizes, isHover ? colorHover : color, 1);


        var sliderValueStrSizes = this._getTextSizes(sliderValueStr);


        // render text in slider
        this._textCenter(draggerPosition, draggerSizes, sliderValueStr);

        // return top right corner, and bottom right corner of the dragger.
        return {
            topRight: [draggerPosition[0] + draggerSizes[0], draggerPosition[1]],
            bottomRight: [draggerPosition[0] + draggerSizes[0], draggerPosition[1] + draggerSizes[1]],
        };
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
