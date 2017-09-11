import * as hashString from 'hash-string';
import * as clamp from 'clamp';
import { Shared } from '../Shared';
import { TitleBar } from './TitleBar';
import * as createShader from 'gl-shader';
import * as createBuffer from 'gl-buffer';
import * as createTexture from 'gl-texture2d';
import * as mat4 from 'gl-mat4';

export class BaseRenderer {

    indexBuffer = [];
    indexBufferIndex: number = 0;
    positionBuffer = [];
    positionBufferIndex: number = 0;
    colorBuffer = [];
    colorBufferIndex: number = 0;
    uvBuffer = [];
    uvBufferIndex: number = 0;



    _unitCircle(position, theta, radius): [number, number] {
        return [position[0] + radius * Math.cos(theta), position[1] + radius * Math.sin(theta)];
    };

    /* Add vertex that only has one color, and does not use a texture. */
    _coloredVertex(position, color): void {
        // at this uv-coordinate, the font atlas is entirely white.
        var whiteUv = [0.95, 0.95];

        this._addPosition(position);
        this._addColor(color);
        this._addUv(whiteUv);
    };

    _addIndex(index): void {
        this.indexBuffer[this.indexBufferIndex++] = index;
    };

    _addPosition(position): void {
        this.positionBuffer[this.positionBufferIndex++] = position[0];
        this.positionBuffer[this.positionBufferIndex++] = position[1];
    };

    _addColor(color): void {
        this.colorBuffer[this.colorBufferIndex++] = color[0];
        this.colorBuffer[this.colorBufferIndex++] = color[1];
        this.colorBuffer[this.colorBufferIndex++] = color[2];
        this.colorBuffer[this.colorBufferIndex++] = color[3];
    };

    _addUv(uv): void {
        this.uvBuffer[this.uvBufferIndex++] = uv[0];
        this.uvBuffer[this.uvBufferIndex++] = uv[1];
    };

    _inCircle(p, s, x): boolean {

        // circle center
        var cp = [
            p[0] + 0.5 * s[0],
            p[1] + 0.5 * s[1]

        ];
        var radius = s[0] * 0.5;

        // distance from `x` to circle center.
        var dist = Math.sqrt((x[0] - cp[0]) * (x[0] - cp[0]) + (x[1] - cp[1]) * (x[1] - cp[1]));

        return (dist <= radius);
    }

    /* Given a box with position `p`, width `s[0]`, height `[1]`, return whether the point with the position `x` is inside the box. */
    _inBox(p, s, x): boolean {
        var minX = p[0];
        var minY = p[1];

        var maxX = p[0] + s[0];
        var maxY = p[1] + s[1];

        return (
            minX <= x[0] && x[0] <= maxX &&
            minY <= x[1] && x[1] <= maxY
        );
    }

    /* Render a box. `color` is a RGB-triplet. the optional `alpha` argument specifies the transparency of the box. default value of `alpha` is 1.0 */
    _box(position: number[], size: number[], color: number[], alpha: number): void {


        if (typeof alpha === 'undefined') {
            alpha = 1.0; // default to 1.0
        }

        // top-left, bottom-left, top-right, bottom-right corners
        var tl = position;
        var bl = [position[0], position[1] + size[1]];
        var tr = [position[0] + size[0], position[1]];
        var br = [position[0] + size[0], position[1] + size[1]];

        var baseIndex = this.positionBufferIndex / 2;

        var c = [color[0], color[1], color[2], alpha];

        // vertex 1
        this._coloredVertex(tl, c);

        // vertex 2
        this._coloredVertex(bl, c);

        // vertex 3
        this._coloredVertex(tr, c);

        // vertex 4
        this._coloredVertex(br, c);


        // triangle 1
        this._addIndex(baseIndex + 0);
        this._addIndex(baseIndex + 1);
        this._addIndex(baseIndex + 2);

        // triangle 2
        this._addIndex(baseIndex + 3);
        this._addIndex(baseIndex + 2);
        this._addIndex(baseIndex + 1);

    };

    /* Render a circle, where the top-left corner of the circle is `position` Where `segments` is how many triangle segments the triangle is rendered with. */
    _circle(position, sizes, color, segments): void {

        let centerPosition = [
            position[0] + 0.5 * sizes[0],
            position[1] + 0.5 * sizes[1]
        ];
        let radius = sizes[0] / 2;

        let baseIndex = this.positionBufferIndex / 2;

        let c = [color[0], color[1], color[2], 1.0];

        // add center vertex.
        this._coloredVertex(centerPosition, c);
        let centerVertexIndex = baseIndex + 0;


        let stepSize = (2 * Math.PI) / segments;
        let curIndex = baseIndex + 1;
        for (var theta = 0; theta <= 2 * Math.PI + 0.1; theta += stepSize, ++curIndex) {

            // for first frame, we only create one vertex, and no triangles
            if (theta == 0) {
                let p = this._unitCircle(centerPosition, theta, radius);
                this._coloredVertex(p, c);
            } else {
                let p = this._unitCircle(centerPosition, theta, radius);
                this._coloredVertex(p, c);

                this._addIndex(curIndex + 0);
                this._addIndex(curIndex - 1);
                this._addIndex(centerVertexIndex);
            }
        }
    };
}
