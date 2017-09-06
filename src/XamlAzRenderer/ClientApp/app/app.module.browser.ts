import * as clamp from 'clamp';
import * as mat4 from 'gl-mat4';
import * as vec3 from 'gl-vec3';
import * as Geometry from 'gl-geometry';
import * as glShader from 'gl-shader';
import * as createTexture from 'gl-texture2d';
import * as glShell from 'gl-now';
import { AppModuleShared } from './app.module.shared';

export class AppModule {
    mouseLeftDownPrev: boolean = false;
    public TestClamp(): Number {
        var t = clamp(0.65, 0, 1.0);
        return t;
    }

    public TestMat4(): void {
        let projection = mat4.create();
        let canvasWidth: number = 400;
        let canvasHeight: number = 400;
        mat4.ortho(projection, 0, canvasWidth, canvasHeight, 0, -1.0, 1.0)
    }

    public TestCreateTexture(): void {
        let ct = createTexture(null, null);
    }

    public InitShell(): void {
        let shell = glShell();
        shell.on("gl-init", () => {
            let gl = shell.gl;
            gl.enable(gl.DEPTH_TEST);
            gl.enable(gl.CULL_FACE);


        });
        shell.on("gl-render", () => {

        });
        let pressed = shell.wasDown("mouse-left");
        let io = {
            mouseLeftDownCur: pressed,
            mouseLeftDownPrev: this.mouseLeftDownPrev,

            mousePositionCur: shell.mouse,
            mousePositionPrev: shell.prevMouse
        };
        this.mouseLeftDownPrev = pressed;
        shell.on("tick", () => {
            
        });
    }

    constructor() {
        console.log(this.TestClamp());
        this.TestMat4();
        // this.TestCreateTexture();
        this.InitShell();
    }
}