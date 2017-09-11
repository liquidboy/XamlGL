import * as hashString from 'hash-string';
import * as clamp from 'clamp';
import { Shared } from '../Shared';
import { TextRenderer } from './TextRenderer';
import { BaseRenderer } from './BaseRenderer';
import * as createShader from 'gl-shader';
import * as createBuffer from 'gl-buffer';
import * as createTexture from 'gl-texture2d';
import * as mat4 from 'gl-mat4';

export class SeparatorRenderer implements BaseRenderer, TextRenderer {
    
    // main
    prevWidgetSizes: any;
    activeWidgetId
    windowCaret: number[];
    _moveWindowCaret: () => void;
    io: any;
    windowSizes = [360, 500];
    windowSpacing: number = 14;


    // separatorRenderer
    separatorColor = [0.4, 0.4, 0.4]; //  the color of a separator.
    separatorHeightRatio: number = 0.2; // the height of a separator (height of "0") *     public separatorHeightRatio


    separator(): void {
        this._moveWindowCaret();

        var separatorPosition = this.windowCaret;
        // the separator should fill out the windows size.
        var separatorSizes = [
            this.windowSizes[0] - 2 * this.windowSpacing,
            this._getTextSizes("0")[1] * this.separatorHeightRatio];

        this._box(separatorPosition, separatorSizes, [0.4, 0.4, 0.4], 1);

        this.prevWidgetSizes = (separatorSizes);
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
