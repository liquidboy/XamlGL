import * as hashString from 'hash-string';
import * as clamp from 'clamp';
import { Shared } from '../Shared';
import { TitleBar } from './TitleBar';
import { BaseRenderer } from './BaseRenderer';
import * as createShader from 'gl-shader';
import * as createBuffer from 'gl-buffer';
import * as createTexture from 'gl-texture2d';
import * as mat4 from 'gl-mat4';

export class TextRenderer implements BaseRenderer {
    /* DO NOT CHANGE THIS VALUE. The entire GUI layout will break! */
    textScale: number = 1.0;

    // main
    prevWidgetSizes: any;
    windowCaret: number[];
    _moveWindowCaret: () => void;

    _getCharDesc(char): any {
        return Shared.guiFontInfo.chars[char.charCodeAt(0) - 32];
    };

    /* render text */
    _text(position, str): void {

        /*
         Make sure to round the position to integer. Otherwise, anti-aliasing causes the text to get blurry,
         it seems
         */
        var x = Math.round(position[0]);
        var y = Math.round(position[1]);

        /*
         Width of a single pixel in the font atlas.
         */
        var ipw = 1.0 / 256;
        var iph = 1.0 / 256;

        for (var i = 0; i < str.length; ++i) {

            var ch = str[i];

            // char desc
            var cd = this._getCharDesc(ch);

            /*
             We will render a single character as a quad.
             First we gather all information needed to render the quad:
             */

            var x0 = (x + cd.xoff) * this.textScale;
            var y0 = (y + cd.yoff) * this.textScale;
            var x1 = (x + cd.xoff2) * this.textScale;
            var y1 = (y + cd.yoff2) * this.textScale;


            var s0 = (cd.x0 * ipw);
            var t0 = (cd.y0 * iph);
            var s1 = (cd.x1 * ipw);
            var t1 = (cd.y1 * iph);

            // render text as white.
            var whiteColor = [1, 1, 1, 1]


            /*
             Now we have all the information. Now render the quad as two triangles:
             */

            var baseIndex = this.positionBufferIndex / 2;

            // top left
            this._addPosition([x0, y0]);
            this._addColor(whiteColor);
            this._addUv([s0, t0]);

            // bottom left
            this._addPosition([x0, y1]);
            this._addColor(whiteColor);
            this._addUv([s0, t1]);

            // top right
            this._addPosition([x1, y0]);
            this._addColor(whiteColor);
            this._addUv([s1, t0]);


            // bottom right
            this._addPosition([x1, y1]);
            this._addColor(whiteColor);
            this._addUv([s1, t1]);

            // triangle 1
            this._addIndex(baseIndex + 0);
            this._addIndex(baseIndex + 1);
            this._addIndex(baseIndex + 2);

            // triangle 2
            this._addIndex(baseIndex + 3);
            this._addIndex(baseIndex + 2);
            this._addIndex(baseIndex + 1);

            // finally, advance the x-coord, in preparation of rendering the next character.
            x += (cd.xadvance) * this.textScale;
        }
    }

    /* Render text centered in a box with position `p`, width `s[0]`, height `[1]`, */
    _textCenter(p, s, str): void {
        var strSizes = this._getTextSizes(str);

        // we must round, otherwise the text may end up between pixels(say at 1.5, or 1.6, or something ),
        // and this makes it blurry
        var strPosition = [
            Math.round(0.5 * (p[0] + (p[0] + s[0]) - strSizes[0])),
            Math.round(0.5 * (p[1] + (p[1] + s[1]) + strSizes[1])),
        ];

        this._text(strPosition, str);
    }

    /* Get width and height of a text string. */
    _getTextSizes(str): [number, number] {

        var width = 0;
        var height = 0; // the height of the highest character.

        for (var i = 0; i < str.length; ++i) {
            var ch = str[i];
            var cd = this._getCharDesc(ch);

            width += (cd.xadvance) * this.textScale;

            var y0 = (cd.yoff) * this.textScale;
            var y1 = (cd.yoff2) * this.textScale;
            var h = y1 - y0;

            if (height < h) {
                height = h;
            }

        }

        return [width, height];
    }

    textLine(str): void {
        this._moveWindowCaret();

        var textLinePosition = this.windowCaret;
        var textSizes = this._getTextSizes(str);

        // Render button text.
        this._textCenter(textLinePosition, textSizes, str);

        this.prevWidgetSizes = textSizes;
    };



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
