﻿import * as hashString from 'hash-string';
import * as clamp from 'clamp';
import { Shared } from '../Shared';
import { BaseRenderer } from './BaseRenderer';
import { TextRenderer } from './TextRenderer';
import { ButtonRenderer } from './ButtonRenderer';
import { SliderRenderer } from './SliderRenderer';
import { RadioButtonRenderer } from './RadioButtonRenderer';
import { DraggerRenderer } from './DraggerRenderer';
import { CheckboxRenderer } from './CheckboxRenderer';
import { SeparatorRenderer } from './SeparatorRenderer';
import { IO } from './IO';
import { TitleBar } from './TitleBar';
import * as createShader from 'gl-shader';
import * as createBuffer from 'gl-buffer';
import * as createTexture from 'gl-texture2d';
import * as mat4 from 'gl-mat4';

export class Window implements BaseRenderer, ButtonRenderer, SliderRenderer, TextRenderer, RadioButtonRenderer, DraggerRenderer, CheckboxRenderer, SeparatorRenderer {

    // distance from window-borders to the widgets.
    public windowSpacing: number = 14;
    // the vertical and horizontal spacing between the widgets.
    public widgetSpacing: number = 11;
    defaultSpacing: number = 11;

    public currentWidgetAlignment: number = 0;
    public widgetHorizontalAlignment: number = 0;  //0 = left, 1 = right
    defaultHorizontalAlignment: number = 0;

    // position of the window.
    public windowPosition = [20, 20];
    // size of the window.
    public windowSizes = [360, 500];
    // color of the window.
    public windowColor = [0.1, 0.1, 0.1];
    // the transparency of the window.
    public windowAlpha: number = 0.9;

    public titleBar: TitleBar = new TitleBar();
    io: IO;

    /* button settings */

    // the horizontal and vertical spacing between the button border and its text label.
    public buttonSpacing: number = 3;
    
    
    // button color when mouse click.
    public clickButtonColor = [0.50, 0.1, 0.1];

    
    
    /* general settings */

    // Some widgets render a label in addition to themselves(such as the sliders and draggers)
    // this value is the horizontal spacing between the label and the widget for those widgets.
    widgetLabelHorizontalSpacing: number = 4;

    // Some widgets will grow horizontally as the window size increases. They are grown to occupy this
    // ratio of the total window width.
    widgetHorizontalGrowRatio: number = 0.6;

    
    /*
     Keeps track of the ID of the widget that is currently being pressed down.
     We need to keep track of this, because otherwise we can't, for instance,  affect the value of a
     slider while the mouse is OUTSIDE the hitbox of the slider.
     */
    public activeWidgetId: string = null;

    /* See _moveWindowCaret() for an explanation. */
    public sameLineActive: boolean = false;
    public prevWidgetSizes = null;
    public prevWidgetPosition: number[] = null;

    private _gl: any;
    private shader : any;

    /* buffers contain all the geometry data. */
    private positionBufferObject : any;
    private colorBufferObject : any;
    private uvBufferObject : any;
    private indexBufferObject: any;

    private fontAtlasTexture: any;

    windowCaret: number[];
    private relativeMousePosition: any;
    private mouseInWindow: boolean;
    




    constructor(gl: any) {
        this._gl = gl;


        /* single shader renders the GUI. */
        this.shader = createShader(gl, Shared.guiVert, Shared.guiFrag);

        /* buffers contain all the geometry data. */
        this.positionBufferObject = createBuffer(gl, [], gl.ARRAY_BUFFER, gl.DYNAMIC_DRAW);
        this.colorBufferObject = createBuffer(gl, [], gl.ARRAY_BUFFER, gl.DYNAMIC_DRAW);
        this.uvBufferObject = createBuffer(gl, [], gl.ARRAY_BUFFER, gl.DYNAMIC_DRAW);
        this.indexBufferObject = createBuffer(gl, [], gl.ELEMENT_ARRAY_BUFFER, gl.DYNAMIC_DRAW);

        this.fontAtlasTexture = createTexture(gl, Shared.guiFontAtlas);
        this.fontAtlasTexture.magFilter = gl.LINEAR;
        this.fontAtlasTexture.minFilter = gl.LINEAR;

        
    }

    drawShellButtons(): void {

        this.alignRight();
        this.button("butWindowClose", "✕", [20, 20], [0, 0, 0, 0], [0, 0]);
        this.sameLine();
        this.alignRight();
        this.button("butWindowMinimize", "🗕", [20, 20], [0, 0, 0, 0], [0, 0]);
        this.sameLine();
        this.alignRight();
        this.button("butWindowMaximize", "🗖", [20, 20], [0, 0, 0, 0], [0, 0]);

    }


    begin(io: IO): void {

        // sanity checking.
        if (typeof io == 'undefined') {
            throw new Error("argument 'io' missing ");
        } else {

            if (typeof io.mousePositionCur == 'undefined') {
                throw new Error("property 'io.mousePositionCur' missing ");
            }
            if (typeof io.mousePositionPrev == 'undefined') {
                throw new Error("property 'io.mousePositionPrev' missing ");
            }
            if (typeof io.mouseLeftDownCur == 'undefined') {
                throw new Error("property 'io.mouseLeftDownCur' missing ");
            }
            if (typeof io.mouseLeftDownPrev == 'undefined') {
                throw new Error("property 'io.mouseLeftDownPrev' missing ");
            }
        }

        /*
        Setup geometry buffers.
         */
        this.indexBuffer = [];
        this.positionBuffer = [];
        this.colorBuffer = [];
        this.uvBuffer = [];

        this.indexBufferIndex = 0;
        this.positionBufferIndex = 0;
        this.colorBufferIndex = 0;
        this.uvBufferIndex = 0;

        this.io = io;

        this.render();

    };
    
    render(): void {

        var widgetId = hashString(this.titleBar.Title);

        /*
         WINDOW IO(move window when dragging the title-bar using the left mouse button)
         */

        this.titleBar.Position = this.windowPosition;
        this.titleBar.Size = [this.windowSizes[0], this.titleBar.Height];

        if (
            this._inBox(this.titleBar.Position, this.titleBar.Size, this.io.mousePositionCur) &&
            this.io.mouseLeftDownCur == true && this.io.mouseLeftDownPrev == false) {
            this.activeWidgetId = widgetId;
        }

        if (this.activeWidgetId == widgetId) {

            if (this._inBox(this.titleBar.Position, this.titleBar.Size, this.io.mousePositionCur)) {
                // if mouse in title bar, just use the mouse position delta to adjust the window pos.

                this.windowPosition = [
                    this.windowPosition[0] + (this.io.mousePositionCur[0] - this.io.mousePositionPrev[0]),
                    this.windowPosition[1] + (this.io.mousePositionCur[1] - this.io.mousePositionPrev[1])
                ];

                // the mouse position relative to the top-left corner of the window.
                this.relativeMousePosition = [
                    (this.windowPosition[0] - this.io.mousePositionCur[0]),
                    (this.windowPosition[1] - this.io.mousePositionCur[1])
                ];

            } else {

                /*
                 If the window cannot keep up with the mouse, we must use the relative mouse position to approximate
                 the change in (x,y)
                 */

                this.windowPosition = [
                    this.relativeMousePosition[0] + (this.io.mousePositionCur[0]),
                    this.relativeMousePosition[1] + (this.io.mousePositionCur[1])
                ];
            }

            // update title bar position.
            this.titleBar.Position = this.windowPosition;
        }

        /*
         WINDOW RENDERING.
         */

        // draw title bar
        this._box(this.titleBar.Position, this.titleBar.Size, this.titleBar.BackgroundColor, 1);

        // draw title bar text
        this._textCenter(
            [this.windowPosition[0] + this.titleBar.VerticalSpacing, this.windowPosition[1]],
            [this._getTextSizes(this.titleBar.Title)[0], this.titleBar.Height],
            this.titleBar.Title);

        // draw the actual window.
        this._box([this.windowPosition[0], this.windowPosition[1] + this.titleBar.Height], this.windowSizes,
            this.windowColor, this.windowAlpha);

        // setup the window-caret. The window-caret is where we will place the next widget in the window.
        this.windowCaret = [
            this.windowPosition[0] + this.windowSpacing,
            this.windowPosition[1] + this.windowSpacing + this.titleBar.Height];
        this.prevWidgetSizes = null; // should be null at the beginning.
        this.prevWidgetPosition = null;

        /*
         Determine whether the mouse is inside the window. We need this in some places.
         */
        this.mouseInWindow = this._inBox(this.titleBar.Position,
            [this.windowSizes[0], this.titleBar.Height + this.windowSizes[1]],
            this.io.mousePositionCur);
    }

    end(gl, canvasWidth, canvasHeight): void {

        if (typeof gl == 'undefined') {
            throw new Error("argument 'gl' missing ");
        }
        if (!(typeof canvasWidth == 'number')) {
            throw new Error("argument 'canvasWidth' must be a number ");
        }
        if (!(typeof canvasHeight == 'number')) {
            throw new Error("argument 'canvasHeight' must be a number ");
        }


        /*
         If a VAO is already bound, we need to unbound it. Otherwise, we will write into a VAO created by the user of the library
         when calling vertexAttribPointer, which means that we would effectively corrupt the user data!
         */
        var VAO_ext = gl.getExtension('OES_vertex_array_object');
        if (VAO_ext)
            VAO_ext.bindVertexArrayOES(null);

        /*
         We are changing some GL states when rendering the GUI. So before rendering we backup these states,
         and after rendering we restore these states. This is so that the end-user does not involuntarily have his
         GL-states messed with.
         */
        this.backupGLState(gl);


        this.positionBufferObject.update(this.positionBuffer);
        gl.enableVertexAttribArray(this.shader.attributes.aPosition.location);
        gl.vertexAttribPointer(this.shader.attributes.aPosition.location, 2, gl.FLOAT, false, 0, 0);
        this.positionBufferObject.unbind();


        this.colorBufferObject.update(this.colorBuffer);
        gl.enableVertexAttribArray(this.shader.attributes.aColor.location);
        gl.vertexAttribPointer(this.shader.attributes.aColor.location, 4, gl.FLOAT, false, 0, 0);
        this.colorBufferObject.unbind();

        this.uvBufferObject.update(this.uvBuffer);
        gl.enableVertexAttribArray(this.shader.attributes.aUv.location);
        gl.vertexAttribPointer(this.shader.attributes.aUv.location, 2, gl.FLOAT, false, 0, 0);
        this.uvBufferObject.unbind();

        this.indexBufferObject.update(this.indexBuffer);


        /*
         Setup matrices.
         */
        var projection = mat4.create()
        mat4.ortho(projection, 0, canvasWidth, canvasHeight, 0, -1.0, 1.0)

        this.shader.bind()

        this.shader.uniforms.uProj = projection;
        this.shader.uniforms.uFontAtlas = this.fontAtlasTexture.bind()

        gl.disable(gl.DEPTH_TEST) // no depth testing; we handle this by manually placing out
        // widgets in the order we wish them to be rendered.


        // for text rendering, enable alpha blending.
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

        gl.drawElements(gl.TRIANGLES, (this.indexBufferIndex), gl.UNSIGNED_SHORT, 0);


        /*
         Make sure to always reset the active widget id, if mouse is released.
         This makes sure that every widget does not explicitly have to reset this value
         by themselves, which is a bit error-prone.
         */
        if (this.activeWidgetId != null && this.io.mouseLeftDownCur == false) {
            this.activeWidgetId = null;
        }


        this.restoreGLState(gl);

    };
    
    public sameLine(spacing: number = null): void {
        if (spacing == null) this.widgetSpacing = this.defaultSpacing;
        else this.widgetSpacing = spacing;
        this.sameLineActive = true;
    }

    public alignRight(): void {
        this.widgetHorizontalAlignment = 1;
    }

    public IsWidgetRightAligned(): boolean {
        return this.widgetHorizontalAlignment === 1;
    }

    public alignLeft(): void {
        this.widgetHorizontalAlignment = 0;
    }

    public IsWidgetLeftAligned(): boolean {
        return this.widgetHorizontalAlignment === 0;
    }

    public alignCenter(): void {
        this.widgetHorizontalAlignment = 2;
    }

    IsWidgetCenterAligned(): boolean {
        return this.widgetHorizontalAlignment === 2;
    }
    
    moveWindowCaret(): void {

        if (this.prevWidgetSizes == null) {
            // we have not yet laid out the first widget. Do nothing.
            return;
        }
        
        if (this.IsWidgetLeftAligned()) {
            // default widgets are "LeftAligned"
            if (this.sameLineActive) {
                this.windowCaret = [this.windowCaret[0] + this.widgetSpacing + this.prevWidgetSizes[0], this.windowCaret[1]];
                //this.windowCaret = [this.windowCaret[0] + this.widgetSpacing + this.prevWidgetSizes[0], this.windowCaret[1]];
            } else {
                this.windowCaret = [this.windowSpacing + this.windowPosition[0], this.windowCaret[1] + this.widgetSpacing + this.prevWidgetSizes[1]];
            }
        } else if (this.IsWidgetCenterAligned()) {

            this.windowCaret = [this.windowPosition[0] + (this.windowSizes[0] / 2) , this.windowCaret[1] + this.widgetSpacing + this.prevWidgetSizes[1]];
            
        } else if (this.IsWidgetRightAligned()) {
            if (this.sameLineActive) {
                // 2nd control onwards
                this.windowCaret = [this.prevWidgetPosition[0] - (this.prevWidgetSizes[0] + this.widgetSpacing), this.windowCaret[1]];
            } else {
                // 1st control
                this.windowCaret = [this.windowPosition[0] + (this.windowSizes[0] - this.prevWidgetSizes[0]), this.windowCaret[1] + this.widgetSpacing + this.prevWidgetSizes[1]];
            }
        } else {
            // should never get here
        }

        // use this to pass the alignment to the pipeline, the widgetHorizontalAlignment is cleared at end of this carret  call
        this.currentWidgetAlignment = this.widgetHorizontalAlignment;
        
        // the user have to explicitly call sameLine() again if we he wants samLineActive again.
        this.sameLineActive = false;

        // by default widgets are aligned to the left
        this.widgetHorizontalAlignment = 0;
    };

    hasMouseFocus(): boolean{
        return this.mouseInWindow || this.activeWidgetId != null;
    }


    private lastProgram: any;
    private lastElementArrayBuffer: any;
    private lastArrayBuffer: any;
    private lastTexture: any;
    private lastEnableDepthTest: any;
    private lastEnableBlend: any;
    backupGLState(gl):void {

        this.lastProgram = gl.getParameter(gl.CURRENT_PROGRAM);
        this.lastElementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
        this.lastArrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
        this.lastTexture = gl.getParameter(gl.TEXTURE_BINDING_2D);
        this.lastEnableDepthTest = gl.isEnabled(gl.DEPTH_TEST);
        this.lastEnableBlend = gl.isEnabled(gl.BLEND);

        /*
         TODO: figure out how to back up `blendFunc`.
         */

    }

    restoreGLState(gl): void {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.lastElementArrayBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.lastArrayBuffer);
        gl.useProgram(this.lastProgram);
        gl.bindTexture(gl.TEXTURE_2D, this.lastTexture);

        if (this.lastEnableDepthTest) gl.enable(gl.DEPTH_TEST); else gl.disable(gl.DEPTH_TEST);
        if (this.lastEnableBlend) gl.enable(gl.BLEND); else gl.disable(gl.BLEND);
    }



    

    // SeparatorRenderer
    separatorColor = [0.4, 0.4, 0.4];
    separatorHeightRatio: number = 0.2;
    separator: ()=> void;




    // RadioButtonRenderer
    radioButtonOuterColor = [0.3, 0.3, 0.3];
    radioButtonInnerColor = [0.15, 0.15, 0.15];
    radioButtonOuterColorHover = [0.33, 0.33, 0.33];
    radioButtonInnerColorHover = [0.18, 0.18, 0.18];
    radioButtonCircleSegments: number = 9;
    radioButtonInnerRadius: number = 0.6;
    radioButtonOuterRadius: number = 1.0;
    radioButton: (labelStr, value, id) => void
    




    // SliderRenderer
    sliderVerticalSpacing: number = 4;
    sliderBackgroundColor = [0.16, 0.16, 0.16];
    sliderFillColor = [0.0, 0.3, 0.6];
    sliderBackgroundColorHover = [0.19, 0.19, 0.19];
    sliderFillColorHover = [0.0, 0.3, 0.70];
    _slider: (labelStr, value, min, max, doRounding, numDecimalDigits) => void;
    sliderFloat: (str, value, min, max, numDecimalDigits) => void;




    // draggerrenderer
    draggerWidgetHorizontalSpacing: number = 3;
    draggerVerticalSpacing: number = 5;
    draggerRgbRedColor = [0.3, 0.0, 0.0];
    draggerRgbRedColorHover = [0.35, 0.0, 0.0];
    draggerRgbGreenColor = [0.0, 0.3, 0.0];
    draggerRgbGreenColorHover = [0.0, 0.35, 0.0];
    draggerRgbBlueColor = [0.0, 0.0, 0.3];
    draggerRgbBlueColorHover = [0.0, 0.0, 0.38];
    draggerFloatColor = [0.30, 0.30, 0.30];
    draggerFloatColorHover = [0.32, 0.32, 0.32];
    _draggerFloatN: (labelStr: string, value: number[], N: number, minMaxValues, subLabels, colors) => void;
    draggerRgb: (labelStr: string, value: number[]) => void
    draggerFloat2: (labelStr, value, minMaxValues, subLabels) => void;
    draggerFloat3: (labelStr, value, minMaxValues, subLabels) => void;
    _draggerFloat: (widgetId, labelStr, value, color, colorHover, width, position, minVal, maxVal) => any;





    // CheckboxRenderer
    checkboxOuterColor = [0.3, 0.3, 0.3];
    checkboxInnerColor = [0.15, 0.15, 0.15];
    checkboxOuterColorHover = [0.33, 0.33, 0.33];
    checkboxInnerColorHover = [0.18, 0.18, 0.18];
    checkBoxInnerSizeRatio: number = 1.4;
    checkBoxOuterSizeRatio: number = 2.0;
    checkbox: (labelStr, value) => void;



    // ButtonRenderer
    buttonColor: number[] = [0.35, 0.1, 0.1];
    hoverButtonColor: number[] = [0.40, 0.1, 0.1];
    button: (id: string, labelStr: string, padding: number[], margin: number[], startPos: number[]) => void;
    _button: (widgetId, labelStr, color, colorHover, size, position) => any;


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


    // TextRenderer
    textScale: number = 1.0;
    _text: (position, str) => void;
    _textCenter: (p, s, str) => void;
    textLine: (str) => void;
    _getTextSizes: (str) => [number, number];
    _getCharDesc: (char) => any;
}

Shared.applyMixins(Window, [BaseRenderer, TextRenderer, SliderRenderer, ButtonRenderer, RadioButtonRenderer, DraggerRenderer, CheckboxRenderer, SeparatorRenderer]);