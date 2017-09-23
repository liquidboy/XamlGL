import * as clamp from 'clamp';
import * as mat4 from 'gl-mat4';
import * as vec3 from 'gl-vec3';
import * as Geometry from 'gl-geometry';
import * as createShader from 'gl-shader';
import * as hashString from 'hash-string';
import * as bunny from 'bunny';
import * as boundingBox from 'vertices-bounding-box';
import * as transform from 'geo-3d-transform-mat4';
import * as createBuffer from 'gl-buffer';
import * as createTexture from 'gl-texture2d';
import * as createOrbitCamera from 'orbit-camera';
import * as cameraPosFromViewMatrix from 'gl-camera-pos-from-view-matrix';
import * as glShell from 'gl-now';
import * as normals from 'normals';
import { Shared } from './Shared';
import { WindowManager } from './components/WindowManager';
import { IO } from './components/IO';

export class Browser {
    mouseLeftDownPrev: boolean = false;
    bg: any = [0.6, 0.7, 1.0]; // clear color.
    camera: any = createOrbitCamera([0, -1000, 0], [0, 0, 0], [0, 1, 0]);
    dwm: WindowManager;

    demo1DiffuseColor: number[] = [0.42, 0.34, 0.0];
    demo1AmbientLight: number[]  = [0.77, 0.72, 0.59];
    demo1LightColor: number[]  = [0.40, 0.47, 0.0];
    demo1SunDir: number[]  = [-0.69, 1.33, 0.57];
    demo1SpecularPower: any  = { val: 12.45 };
    demo1HasSpecular: any  = { val: true };
    // demo1RenderModel = { val: RENDER_BUNNY };
    demo2HeightmapPosition: number[]  = [0.0, 0.0];



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
    
    private centerGeometry(geo, scale): void {

        // Calculate the bounding box.
        var bb = boundingBox(geo.positions);

        // Translate the geometry center to the origin.
        var translate = [-0.5 * (bb[0][0] + bb[1][0]), -0.5 * (bb[0][1] + bb[1][1]), -0.5 * (bb[0][2] + bb[1][2])];
        var m = mat4.create();
        mat4.scale(m, m, [scale, scale, scale]);
        mat4.translate(m, m, translate);

        geo.positions = transform(geo.positions, m)
    }

    private bunnyGeo: any;
    private demo1Shader: any;
    private demo: { [x: string]: any, val: number } = { val: 1 };
    public InitShell(): any {
        let shell = glShell();
        shell.on("gl-init", () => {
            let gl = shell.gl;
            gl.enable(gl.DEPTH_TEST);
            gl.enable(gl.CULL_FACE);

            this.dwm = new WindowManager(gl);

            this.dwm.Create(460, 480);
            this.dwm.Create(360, 200);


            this.centerGeometry(bunny, 80.0);
            this.bunnyGeo = Geometry(gl)
                .attr('aPosition', bunny.positions)
                .attr('aNormal', normals.vertexNormals(bunny.cells, bunny.positions))
                .faces(bunny.cells)

            let sdr: any = createShader(gl, Shared.demo1Vert, Shared.demo1Frag);
            this.demo1Shader = sdr;
        });

        shell.on("gl-render", () => {
            var gl = shell.gl
            var canvas = shell.canvas;

            gl.clearColor(this.bg[0], this.bg[1], this.bg[2], 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.viewport(0, 0, canvas.width, canvas.height);

            let model = mat4.create();
            let projection = mat4.create();
            let scratchMat = mat4.create();
            let view = this.camera.view(scratchMat);
            let scratchVec = vec3.create();

            mat4.perspective(projection, Math.PI / 2, canvas.width / canvas.height, 0.1, 10000.0);


            this.demo1Shader.bind();

            this.demo1Shader.uniforms.uView = view;
            this.demo1Shader.uniforms.uProjection = projection;
            this.demo1Shader.uniforms.uDiffuseColor = this.demo1DiffuseColor;
            this.demo1Shader.uniforms.uAmbientLight = this.demo1AmbientLight;
            this.demo1Shader.uniforms.uLightColor = this.demo1LightColor;
            this.demo1Shader.uniforms.uLightDir = this.demo1SunDir;
            this.demo1Shader.uniforms.uEyePos = cameraPosFromViewMatrix(scratchVec, view);
            this.demo1Shader.uniforms.uSpecularPower = this.demo1SpecularPower.val;
            this.demo1Shader.uniforms.uHasSpecular = this.demo1HasSpecular.val ? 1.0 : 0.0;

            this.bunnyGeo.bind(this.demo1Shader);
            this.bunnyGeo.draw();




            var pressed = shell.wasDown("mouse-left");
            var io = new IO();
            io.mouseLeftDownCur = pressed;
            io.mouseLeftDownPrev = this.mouseLeftDownPrev;
            io.mousePositionCur = shell.mouse;
            io.mousePositionPrev = shell.prevMouse;
            
            this.mouseLeftDownPrev = pressed;






            let win1 = this.dwm.Get(0);
            win1.begin(io);
            win1.titleBar.Title = "Window 1";
            win1.textLine("textline");
            win1.radioButton("radio button 1", this.demo, 1);
            win1.sameLine();
            win1.radioButton("radio button 2", this.demo, 2);
            win1.sameLine();
            win1.radioButton("radio button 3", this.demo, 3);
            win1.separator();
            win1.draggerRgb("drager 1", this.demo1AmbientLight);
            win1.checkbox("checkbox 1", this.demo1HasSpecular);
            win1.sliderFloat("slider 1", this.demo1SpecularPower, 0, 40, 3);
            win1.draggerFloat3("dragger 3 parts", this.demo1SunDir, [-2, +2], ["X:", "Y:", "Z:"]);
            win1.draggerFloat2("dragger 2 parts", this.demo2HeightmapPosition, [-10, +10], ["X:", "Z:"]);
            win1.end(gl, canvas.width, canvas.height);




            let win2 = this.dwm.Get(1);
            win2.begin(io);
            win2.titleBar.Title = "Window 2";
            win2.textLine("textline");
            win2.radioButton("radio button 1", this.demo, 1);
            win2.alignRight();
            win2.button("butButton1", "button 1", [20, 20], [0,0,0,0]);
            win2.sameLine();
            win2.alignRight();
            win2.button("butButton2", "button 2", [20, 20], [0,0,-20,0]);
            win2.sameLine();
            win2.alignRight();
            win2.button("butButton3", "button 3", [20, 20], [0,0,-20,0]);
            win2.end(gl, canvas.width, canvas.height);
            



            console.log("a");

        });
        //let pressed = shell.wasDown("mouse-left");
        //let io = {
        //    mouseLeftDownCur: pressed,
        //    mouseLeftDownPrev: this.mouseLeftDownPrev,

        //    mousePositionCur: shell.mouse,
        //    mousePositionPrev: shell.prevMouse
        //};
        //this.mouseLeftDownPrev = pressed;
        shell.on("tick", () => {

            // if interacting with the GUI, do not let the mouse control the camera.
            if (this.dwm.HasMouseFocus())
                return;

            if (shell.wasDown("mouse-left")) {
                var speed = 2.0;
                this.camera.rotate([(shell.mouseX / shell.width - 0.5) * speed, (shell.mouseY / shell.height - 0.5) * speed],
                    [(shell.prevMouseX / shell.width - 0.5) * speed, (shell.prevMouseY / shell.height - 0.5) * speed])
            }
            if (shell.scroll[1]) {
                this.camera.zoom(shell.scroll[1] * 0.6);
            }

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
