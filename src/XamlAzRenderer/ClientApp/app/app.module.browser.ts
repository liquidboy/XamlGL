import * as clamp from 'clamp';
import * as mat4 from 'gl-mat4';
import * as vec3 from 'gl-vec3';
import * as Geometry from 'gl-geometry';
import * as createShader from 'gl-shader';
import * as hashString from 'hash-string';
import * as createBuffer from 'gl-buffer';
import * as createTexture from 'gl-texture2d';
import * as glShell from 'gl-now';
import { AppModuleShared } from './app.module.shared';
import { Gui } from './components/gui';

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

    public TestHashString(value: string): string {
        let ct = hashString(value);
        return ct; 
    }

    public InitGui(gl: any): void {

        let gui: Gui = new Gui();

        /* single shader renders the GUI. */
        let shader = createShader(gl, AppModuleShared.vert, AppModuleShared.frag);

        /* buffers contain all the geometry data. */
        let positionBufferObject = createBuffer(gl, [], gl.ARRAY_BUFFER, gl.DYNAMIC_DRAW);
        let colorBufferObject = createBuffer(gl, [], gl.ARRAY_BUFFER, gl.DYNAMIC_DRAW);
        let uvBufferObject = createBuffer(gl, [], gl.ARRAY_BUFFER, gl.DYNAMIC_DRAW);
        let indexBufferObject = createBuffer(gl, [], gl.ELEMENT_ARRAY_BUFFER, gl.DYNAMIC_DRAW);
        
        let fontAtlasTexture: any = createTexture(gl, AppModuleShared.fontAtlas);
        fontAtlasTexture.magFilter = gl.LINEAR;
        fontAtlasTexture.minFilter = gl.LINEAR;

        


    }

    public InitShell(): any {
        let shell = glShell();
        shell.on("gl-init", () => {
            let gl = shell.gl;
            gl.enable(gl.DEPTH_TEST);
            gl.enable(gl.CULL_FACE);
            this.InitGui(gl);
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
        console.log(this.TestHashString("testing this string as a hash"));
        this.TestMat4();
        // this.TestCreateTexture();
        this.InitShell();
    }
}