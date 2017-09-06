import * as ndPackImage from 'ndpack-image';

export class AppModuleShared {

    constructor() {

    }
    public static fontInfo = { "chars": [{ "x0": 1, "y0": 1, "x1": 1, "y1": 1, "xoff": 0.000000, "yoff": 0.000000, "xadvance": 7.000000, "xoff2": 0.000000, "yoff2": 0.000000 }, { "x0": 2, "y0": 1, "x1": 3, "y1": 9, "xoff": 3.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 4.000000, "yoff2": 0.000000 }, { "x0": 4, "y0": 1, "x1": 7, "y1": 4, "xoff": 2.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 5.000000, "yoff2": -6.000000 }, { "x0": 8, "y0": 1, "x1": 15, "y1": 9, "xoff": 0.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 16, "y0": 1, "x1": 21, "y1": 10, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 1.000000 }, { "x0": 22, "y0": 1, "x1": 29, "y1": 9, "xoff": 0.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 30, "y0": 1, "x1": 36, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 37, "y0": 1, "x1": 38, "y1": 4, "xoff": 3.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 4.000000, "yoff2": -6.000000 }, { "x0": 39, "y0": 1, "x1": 42, "y1": 12, "xoff": 2.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 5.000000, "yoff2": 2.000000 }, { "x0": 43, "y0": 1, "x1": 46, "y1": 12, "xoff": 2.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 5.000000, "yoff2": 2.000000 }, { "x0": 47, "y0": 1, "x1": 52, "y1": 6, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": -1.000000 }, { "x0": 53, "y0": 1, "x1": 58, "y1": 6, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": -1.000000 }, { "x0": 59, "y0": 1, "x1": 61, "y1": 5, "xoff": 1.000000, "yoff": -2.000000, "xadvance": 7.000000, "xoff2": 3.000000, "yoff2": 2.000000 }, { "x0": 62, "y0": 1, "x1": 67, "y1": 2, "xoff": 1.000000, "yoff": -4.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": -3.000000 }, { "x0": 68, "y0": 1, "x1": 69, "y1": 3, "xoff": 2.000000, "yoff": -2.000000, "xadvance": 7.000000, "xoff2": 3.000000, "yoff2": 0.000000 }, { "x0": 70, "y0": 1, "x1": 75, "y1": 11, "xoff": 1.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 1.000000 }, { "x0": 76, "y0": 1, "x1": 81, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 82, "y0": 1, "x1": 87, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 88, "y0": 1, "x1": 93, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 94, "y0": 1, "x1": 99, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 100, "y0": 1, "x1": 106, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 107, "y0": 1, "x1": 112, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 113, "y0": 1, "x1": 118, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 119, "y0": 1, "x1": 124, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 125, "y0": 1, "x1": 130, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 131, "y0": 1, "x1": 136, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 137, "y0": 1, "x1": 138, "y1": 7, "xoff": 3.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 4.000000, "yoff2": 0.000000 }, { "x0": 139, "y0": 1, "x1": 141, "y1": 9, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 3.000000, "yoff2": 2.000000 }, { "x0": 142, "y0": 1, "x1": 148, "y1": 6, "xoff": 0.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": -1.000000 }, { "x0": 149, "y0": 1, "x1": 155, "y1": 4, "xoff": 1.000000, "yoff": -5.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": -2.000000 }, { "x0": 156, "y0": 1, "x1": 162, "y1": 6, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": -1.000000 }, { "x0": 163, "y0": 1, "x1": 168, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 169, "y0": 1, "x1": 176, "y1": 9, "xoff": 0.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 177, "y0": 1, "x1": 183, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 184, "y0": 1, "x1": 190, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 191, "y0": 1, "x1": 197, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 198, "y0": 1, "x1": 204, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 205, "y0": 1, "x1": 210, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 211, "y0": 1, "x1": 216, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 217, "y0": 1, "x1": 223, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 224, "y0": 1, "x1": 230, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 231, "y0": 1, "x1": 234, "y1": 9, "xoff": 2.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 5.000000, "yoff2": 0.000000 }, { "x0": 235, "y0": 1, "x1": 239, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 5.000000, "yoff2": 0.000000 }, { "x0": 240, "y0": 1, "x1": 246, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 247, "y0": 1, "x1": 252, "y1": 9, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 1, "y0": 13, "x1": 8, "y1": 21, "xoff": 0.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 9, "y0": 13, "x1": 15, "y1": 21, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 16, "y0": 13, "x1": 22, "y1": 21, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 23, "y0": 13, "x1": 28, "y1": 21, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 29, "y0": 13, "x1": 35, "y1": 22, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 1.000000 }, { "x0": 36, "y0": 13, "x1": 42, "y1": 21, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 43, "y0": 13, "x1": 49, "y1": 21, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 50, "y0": 13, "x1": 57, "y1": 21, "xoff": 0.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 58, "y0": 13, "x1": 64, "y1": 21, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 65, "y0": 13, "x1": 72, "y1": 21, "xoff": 0.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 73, "y0": 13, "x1": 80, "y1": 21, "xoff": 0.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 81, "y0": 13, "x1": 87, "y1": 21, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 88, "y0": 13, "x1": 95, "y1": 21, "xoff": 0.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 96, "y0": 13, "x1": 102, "y1": 21, "xoff": 1.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 103, "y0": 13, "x1": 106, "y1": 24, "xoff": 2.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 5.000000, "yoff2": 2.000000 }, { "x0": 107, "y0": 13, "x1": 112, "y1": 23, "xoff": 1.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 1.000000 }, { "x0": 113, "y0": 13, "x1": 116, "y1": 24, "xoff": 2.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 5.000000, "yoff2": 2.000000 }, { "x0": 117, "y0": 13, "x1": 122, "y1": 19, "xoff": 1.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": -3.000000 }, { "x0": 123, "y0": 13, "x1": 130, "y1": 14, "xoff": 0.000000, "yoff": 0.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 1.000000 }, { "x0": 131, "y0": 13, "x1": 133, "y1": 15, "xoff": 2.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 4.000000, "yoff2": -7.000000 }, { "x0": 134, "y0": 13, "x1": 139, "y1": 19, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 140, "y0": 13, "x1": 145, "y1": 22, "xoff": 1.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 146, "y0": 13, "x1": 151, "y1": 19, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 152, "y0": 13, "x1": 157, "y1": 22, "xoff": 1.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 158, "y0": 13, "x1": 163, "y1": 19, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 164, "y0": 13, "x1": 169, "y1": 22, "xoff": 1.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 170, "y0": 13, "x1": 175, "y1": 22, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 3.000000 }, { "x0": 176, "y0": 13, "x1": 181, "y1": 22, "xoff": 1.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 182, "y0": 13, "x1": 184, "y1": 22, "xoff": 2.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 4.000000, "yoff2": 0.000000 }, { "x0": 185, "y0": 13, "x1": 189, "y1": 24, "xoff": 1.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 5.000000, "yoff2": 2.000000 }, { "x0": 190, "y0": 13, "x1": 195, "y1": 22, "xoff": 1.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 196, "y0": 13, "x1": 198, "y1": 22, "xoff": 2.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 4.000000, "yoff2": 0.000000 }, { "x0": 199, "y0": 13, "x1": 206, "y1": 19, "xoff": 0.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 207, "y0": 13, "x1": 212, "y1": 19, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 213, "y0": 13, "x1": 218, "y1": 19, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 219, "y0": 13, "x1": 224, "y1": 22, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 3.000000 }, { "x0": 225, "y0": 13, "x1": 230, "y1": 22, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 3.000000 }, { "x0": 231, "y0": 13, "x1": 236, "y1": 19, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 237, "y0": 13, "x1": 242, "y1": 19, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 243, "y0": 13, "x1": 247, "y1": 21, "xoff": 2.000000, "yoff": -8.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 248, "y0": 13, "x1": 253, "y1": 19, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 1, "y0": 25, "x1": 6, "y1": 31, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 7, "y0": 25, "x1": 14, "y1": 31, "xoff": 0.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": 0.000000 }, { "x0": 15, "y0": 25, "x1": 20, "y1": 31, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 21, "y0": 25, "x1": 26, "y1": 34, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 3.000000 }, { "x0": 27, "y0": 25, "x1": 32, "y1": 31, "xoff": 1.000000, "yoff": -6.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 0.000000 }, { "x0": 33, "y0": 25, "x1": 38, "y1": 36, "xoff": 1.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 2.000000 }, { "x0": 39, "y0": 25, "x1": 40, "y1": 36, "xoff": 3.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 4.000000, "yoff2": 2.000000 }, { "x0": 41, "y0": 25, "x1": 46, "y1": 36, "xoff": 1.000000, "yoff": -9.000000, "xadvance": 7.000000, "xoff2": 6.000000, "yoff2": 2.000000 }, { "x0": 47, "y0": 25, "x1": 54, "y1": 27, "xoff": 0.000000, "yoff": -5.000000, "xadvance": 7.000000, "xoff2": 7.000000, "yoff2": -3.000000 }] };
    public static fontAtlas = ndPackImage(256, 256, 4, "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");
    public static vert: string = `
        precision mediump float;
 
        attribute vec2 aPosition;
        attribute vec4 aColor;
        attribute vec2 aUv;

        uniform mat4 uProj;

        varying vec4 vColor;
        varying vec2 vUv;
 
        void main() {
          gl_Position = uProj * vec4(aPosition, 0, 1);
          vColor = aColor;
          vUv = aUv;
        }
        `;

    public static frag: string = `
        precision mediump float;
 
        varying vec4 vColor;
        varying vec2 vUv;

        uniform sampler2D uFontAtlas;

        void main() {
          vec4 sample = texture2D(uFontAtlas, vUv);
          gl_FragColor = vec4(vColor.xyz * sample.xyz, sample.x * vColor.a );
        }
        `;

}