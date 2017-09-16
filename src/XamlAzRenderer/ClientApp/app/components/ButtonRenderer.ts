import * as hashString from 'hash-string';
import * as clamp from 'clamp';
import { Shared } from '../Shared';
import { TextRenderer } from './TextRenderer';
import { BaseRenderer } from './BaseRenderer';
import * as createShader from 'gl-shader';
import * as createBuffer from 'gl-buffer';
import * as createTexture from 'gl-texture2d';
import * as mat4 from 'gl-mat4';

export class ButtonRenderer implements BaseRenderer, TextRenderer {
    
    // Window
    prevWidgetSizes: any;
    activeWidgetId
    windowCaret: number[];
    moveWindowCaret: () => void;
    io: any;



    // buttonrenderer
    buttonColor: number[] = [0.35, 0.1, 0.1];
    hoverButtonColor: number[] = [0.40, 0.1, 0.1];


    /* If value.val == id, then that means this radio button is chosen. */
    button(id: string, labelStr: string, padding: number[]): void {

        this.moveWindowCaret();

        var pos = this.windowCaret;
        let lblSizesInner = this._getTextSizes(labelStr);
        let lblSizes = [lblSizesInner[0] + padding[0], lblSizesInner[1] + padding[1]];

        this._button(id, labelStr, this.buttonColor, this.hoverButtonColor, lblSizes, pos);
    }

    _button(widgetId, labelStr, color, colorHover, size, position): any {

        /*
        BUTTON IO
         */

        var mouseCollision = this._inBox(position, size, this.io.mousePositionCur);
        if (
            mouseCollision &&
            this.io.mouseLeftDownCur == true && this.io.mouseLeftDownPrev == false) {
            // if slider is clicked, it becomes active.
            this.activeWidgetId = widgetId;
        }

        if (this.activeWidgetId == widgetId) {
            this.activeWidgetId = widgetId;
        }

        /*
         BUTTON RENDERING
         */
        var text = labelStr;


        /*
         If either widget is active, OR we are hovering but not clicking,
         switch to hover color.
         */
        var isHover = (this.activeWidgetId == widgetId) || (mouseCollision && !this.io.mouseLeftDownCur);

        this._box(
            position,
            size, isHover ? colorHover : color, 1);

        var sliderValueStrSizes = this._getTextSizes(text);


        // render text in slider
        this._textCenter(position, size, text);

        // return top right corner, and bottom right corner of the dragger.
        return {
            topRight: [position[0] + size[0], position[1]],
            bottomRight: [position[0] + size[0], position[1] + size[1]],
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
