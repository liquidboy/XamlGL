import * as hashString from 'hash-string';
import * as clamp from 'clamp';
import { Shared } from '../Shared';
import { BaseRenderer } from './BaseRenderer';
import { TitleBar } from './TitleBar';
import * as createShader from 'gl-shader';
import * as createBuffer from 'gl-buffer';
import * as createTexture from 'gl-texture2d';
import * as mat4 from 'gl-mat4';

export class Window implements BaseRenderer, ButtonRenderer, TextRenderer, RadioButtonRenderer, DraggerRenderer, CheckboxRenderer {

    // distance from window-borders to the widgets.
    public windowSpacing: number = 14;
    // the vertical and horizontal spacing between the widgets.
    public widgetSpacing: number = 11;

    // position of the window.
    public windowPosition = [20, 20];
    // size of the window.
    public windowSizes = [360, 500];
    // color of the window.
    public windowColor = [0.1, 0.1, 0.1];
    // the transparency of the window.
    public windowAlpha: number = 0.9;

    public titleBar: TitleBar = new TitleBar();

    /* button settings */

    // the horizontal and vertical spacing between the button border and its text label.
    public buttonSpacing: number = 3;
    // normal button color.
    public buttonColor = [0.35, 0.1, 0.1];
    // button button color when mouse hover
    public hoverButtonColor = [0.40, 0.1, 0.1];
    // button color when mouse click.
    public clickButtonColor = [0.50, 0.1, 0.1];

    /* slider settings */

    // the vertical space between the number(inside the slider) and the border of the slider box.
    public sliderVerticalSpacing: number = 4;
    // the color of the slider background.
    public sliderBackgroundColor = [0.16, 0.16, 0.16];
    // the color of the bar in the slider.
    public sliderFillColor = [0.0, 0.3, 0.6];
    // the color of the slider background when mouse hover,
    public sliderBackgroundColorHover = [0.19, 0.19, 0.19];
    // the color of the bar in the slider when mouse hover.
    public sliderFillColorHover = [0.0, 0.3, 0.70];

    /* dragger settings */

    // the horizontal spacing between the subdragger widgets in a dragger widget.
    public draggerWidgetHorizontalSpacing: number = 3;
    // the vertical spacing between the top and bottom borders and the text in draggers.
    public draggerVerticalSpacing: number = 5;

    // The colors of the three subdraggers in the rgbDragger widget.
    // "Hover", refers to the color when the dragger is hovered.
    public draggerRgbRedColor = [0.3, 0.0, 0.0];
    public draggerRgbRedColorHover = [0.35, 0.0, 0.0];
    public draggerRgbGreenColor = [0.0, 0.3, 0.0];
    public draggerRgbGreenColorHover = [0.0, 0.35, 0.0];
    public draggerRgbBlueColor = [0.0, 0.0, 0.3];
    public draggerRgbBlueColorHover = [0.0, 0.0, 0.38];
    //The colors of the subdraggers in the draggerFloat widgets.
    // "Hover", refers to the color when the dragger is hovered.
    public draggerFloatColor = [0.30, 0.30, 0.30];
    public draggerFloatColorHover = [0.32, 0.32, 0.32];

    /* checkbox settings */


    // the outer color is the color of the outer box of the checkbox,
    // and the inner color is the color of the inner box
    public checkboxOuterColor = [0.3, 0.3, 0.3];
    public checkboxInnerColor = [0.15, 0.15, 0.15];
    public checkboxOuterColorHover = [0.33, 0.33, 0.33];
    public checkboxInnerColorHover = [0.18, 0.18, 0.18];
    // size of inner box will be (height of "0")* checkBoxInnerSizeRatio
    public checkBoxInnerSizeRatio: number = 1.4;
    // size of outer box will be (height of "0")* checkBoxOuterSizeRatio
    public checkBoxOuterSizeRatio: number = 2.0;


    /* radioButton settings */


    // the outer color is the color of the outer circle of the radioButton,
    // and the inner color is the color of the inner circle
    public radioButtonOuterColor = [0.3, 0.3, 0.3];
    public radioButtonInnerColor = [0.15, 0.15, 0.15];
    public radioButtonOuterColorHover = [0.33, 0.33, 0.33];
    public radioButtonInnerColorHover = [0.18, 0.18, 0.18];
    // in order to render the radio button, we must triangulate the circles into triangle segments
    // this number is the number of triangle segments.
    public radioButtonCircleSegments: number = 9;

    // radius of the inner circle will be (height of "0")* innerRadiusRatio
    public radioButtonInnerRadius: number = 0.6;
    // radius of the outer circle will be (height of "0")* outerRadiusRatio
    public radioButtonOuterRadius: number = 1.0;


    /* separator settings. */

    //  the color of a separator.
    public separatorColor = [0.4, 0.4, 0.4];
    // the height of a separator (height of "0") *     public separatorHeightRatio
    public separatorHeightRatio: number = 0.2;

    /* general settings */

    // Some widgets render a label in addition to themselves(such as the sliders and draggers)
    // this value is the horizontal spacing between the label and the widget for those widgets.
    public widgetLabelHorizontalSpacing: number = 4;

    // Some widgets will grow horizontally as the window size increases. They are grown to occupy this
    // ratio of the total window width.
    public widgetHorizontalGrowRatio: number = 0.6;


    /* DO NOT CHANGE THIS VALUE. The entire GUI layout will break! */
    public textScale: number = 1.0;

    /*
     Keeps track of the ID of the widget that is currently being pressed down.
     We need to keep track of this, because otherwise we can't, for instance,  affect the value of a
     slider while the mouse is OUTSIDE the hitbox of the slider.
     */
    public activeWidgetId: string = null;

    /* See _moveWindowCaret() for an explanation. */
    public sameLineActive: boolean = false;
    public prevWidgetSizes = null;

    private _gl: any;
    private shader : any;

    /* buffers contain all the geometry data. */
    private positionBufferObject : any;
    private colorBufferObject : any;
    private uvBufferObject : any;
    private indexBufferObject: any;

    private fontAtlasTexture: any;
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

    /* Setup geometry buffers. */

    
    private io: any;
    begin(io): void {

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

        this._render();

    };


    windowCaret: number[];
    private relativeMousePosition: any;
    private mouseInWindow: boolean;
    _render(): void {

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
        this._backupGLState(gl);


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


        this._restoreGLState(gl);

    };

    ///* render text */
    //_text(position, str): void {

    //    /*
    //     Make sure to round the position to integer. Otherwise, anti-aliasing causes the text to get blurry,
    //     it seems
    //     */
    //    var x = Math.round(position[0]);
    //    var y = Math.round(position[1]);

    //    /*
    //     Width of a single pixel in the font atlas.
    //     */
    //    var ipw = 1.0 / 256;
    //    var iph = 1.0 / 256;

    //    for (var i = 0; i < str.length; ++i) {

    //        var ch = str[i];

    //        // char desc
    //        var cd = this._getCharDesc(ch);

    //        /*
    //         We will render a single character as a quad.
    //         First we gather all information needed to render the quad:
    //         */

    //        var x0 = (x + cd.xoff) * this.textScale;
    //        var y0 = (y + cd.yoff) * this.textScale;
    //        var x1 = (x + cd.xoff2) * this.textScale;
    //        var y1 = (y + cd.yoff2) * this.textScale;


    //        var s0 = (cd.x0 * ipw);
    //        var t0 = (cd.y0 * iph);
    //        var s1 = (cd.x1 * ipw);
    //        var t1 = (cd.y1 * iph);

    //        // render text as white.
    //        var whiteColor = [1, 1, 1, 1]


    //        /*
    //         Now we have all the information. Now render the quad as two triangles:
    //         */

    //        var baseIndex = this.positionBufferIndex / 2;

    //        // top left
    //        this._addPosition([x0, y0]);
    //        this._addColor(whiteColor);
    //        this._addUv([s0, t0]);

    //        // bottom left
    //        this._addPosition([x0, y1]);
    //        this._addColor(whiteColor);
    //        this._addUv([s0, t1]);

    //        // top right
    //        this._addPosition([x1, y0]);
    //        this._addColor(whiteColor);
    //        this._addUv([s1, t0]);


    //        // bottom right
    //        this._addPosition([x1, y1]);
    //        this._addColor(whiteColor);
    //        this._addUv([s1, t1]);

    //        // triangle 1
    //        this._addIndex(baseIndex + 0);
    //        this._addIndex(baseIndex + 1);
    //        this._addIndex(baseIndex + 2);

    //        // triangle 2
    //        this._addIndex(baseIndex + 3);
    //        this._addIndex(baseIndex + 2);
    //        this._addIndex(baseIndex + 1);

    //        // finally, advance the x-coord, in preparation of rendering the next character.
    //        x += (cd.xadvance) * this.textScale;
    //    }
    //}

    ///* Render text centered in a box with position `p`, width `s[0]`, height `[1]`, */
    //_textCenter(p, s, str): void {
    //    var strSizes = this._getTextSizes(str);

    //    // we must round, otherwise the text may end up between pixels(say at 1.5, or 1.6, or something ),
    //    // and this makes it blurry
    //    var strPosition = [
    //        Math.round(0.5 * (p[0] + (p[0] + s[0]) - strSizes[0])),
    //        Math.round(0.5 * (p[1] + (p[1] + s[1]) + strSizes[1])),
    //    ];

    //    this._text(strPosition, str);
    //}

    //textLine(str): void {
    //    this._moveWindowCaret();

    //    var textLinePosition = this.windowCaret;
    //    var textSizes = this._getTextSizes(str);

    //    // Render button text.
    //    this._textCenter(textLinePosition, textSizes, str);

    //    this.prevWidgetSizes = textSizes;
    //};

    public sameLine(): void {
        this.sameLineActive = true;
    }

    public sliderFloat(str, value, min, max, numDecimalDigits): void {

        if (typeof numDecimalDigits === 'undefined') {
            numDecimalDigits = 2; // default value
        }

        this._slider(str, value, min, max, false, numDecimalDigits);
    };
    
    /* If value.val == id, then that means this radio button is chosen. */
    radioButton(labelStr, value, id): void {

        this._moveWindowCaret();

        /*
         Radio button IO
         */


        var zeroHeight = this._getTextSizes("0")[1];


        var innerRadius = (zeroHeight * this.radioButtonInnerRadius);
        var outerRadius = (zeroHeight * this.radioButtonOuterRadius);


        var radioButtonPosition = this.windowCaret;


        var radioButtonSizes = [outerRadius * 2, outerRadius * 2];

        var mouseCollision = this._inCircle(radioButtonPosition, radioButtonSizes, this.io.mousePositionCur);


        if (this.io.mouseLeftDownCur == true && this.io.mouseLeftDownPrev == false && mouseCollision) {
            value.val = id;
        }

        var isHover = mouseCollision;


        /*
         CHECKBOX RENDERING
         */

        this._circle(radioButtonPosition, radioButtonSizes,
            isHover ? this.radioButtonOuterColorHover : this.radioButtonOuterColor, this.radioButtonCircleSegments);


        if (value.val == id) {
            var p = radioButtonPosition;
            var s = radioButtonSizes;
            var innerCirclePosition = [
                Math.round(0.5 * (p[0] + (p[0] + s[0]) - innerRadius * 2)),
                Math.round(0.5 * (p[1] + (p[1] + s[1]) - innerRadius * 2)),
            ];

            this._circle(innerCirclePosition, [innerRadius * 2, innerRadius * 2],
                isHover ? this.radioButtonInnerColorHover : this.radioButtonInnerColor, this.radioButtonCircleSegments);
        }


        // now render radio button label.
        var labelPosition = [radioButtonPosition[0] + radioButtonSizes[0] + this.widgetLabelHorizontalSpacing, radioButtonPosition[1]]
        var labelStrSizes = [this._getTextSizes(labelStr)[0], radioButtonSizes[1]];
        this._textCenter(labelPosition, labelStrSizes, labelStr);

        this.prevWidgetSizes = [radioButtonSizes[0] + labelStrSizes[0], radioButtonSizes[1]];
    }

    /* If value.val == id, then that means this radio button is chosen. */
    button(id: string, labelStr: string, padding: number[]): void {

        this._moveWindowCaret();

        var pos = this.windowCaret;
        let lblSizesInner = this._getTextSizes(labelStr);
        let lblSizes = [lblSizesInner[0] + padding[0], lblSizesInner[1] + padding[1]];

        this._button(id, labelStr, this.buttonColor, this.hoverButtonColor, lblSizes, pos);
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
    
    separator = function () {
        this._moveWindowCaret();

        var separatorPosition = this.windowCaret;
        // the separator should fill out the windows size.
        var separatorSizes = [
            this.windowSizes[0] - 2 * this.windowSpacing,
            this._getTextSizes("0")[1] * this.separatorHeightRatio];

        this._box(separatorPosition, separatorSizes, [0.4, 0.4, 0.4]);

        this.prevWidgetSizes = (separatorSizes);
    }
    
    /*
     sublabels,
     min max, for all n.
     hover color, for all three.
     */
    _draggerFloatN(labelStr: string, value: number[], N: number, minMaxValues, subLabels, colors): void {
        this._moveWindowCaret();

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

    checkbox(labelStr, value): void {

        this._moveWindowCaret();

        /*
         CHECKBOX IO(if checkbox clicked, flip boolean value.)
         */

        // use height of zero to determine size of checkbox, to ensure that the textl label does become higher
        // than the checkbox.
        var zeroHeight = this._getTextSizes("0")[1];


        var innerSize = zeroHeight * this.checkBoxInnerSizeRatio;
        var outerSize = zeroHeight * this.checkBoxOuterSizeRatio;

        var checkboxPosition = this.windowCaret;
        var checkboxSizes = [outerSize, outerSize];

        var mouseCollision = this._inBox(checkboxPosition, checkboxSizes, this.io.mousePositionCur);

        if (this.io.mouseLeftDownCur == true && this.io.mouseLeftDownPrev == false && mouseCollision) {
            value.val = !value.val;
        }

        var isHover = mouseCollision;

        /*
         CHECKBOX RENDERING
         */

        // render outer box.
        this._box(
            checkboxPosition,
            checkboxSizes, isHover ? this.checkboxOuterColorHover : this.checkboxOuterColor, 1);


        // now render a centered inner box, that shows whether the checkbox is true, or false.

        if (value.val) {
            var p = checkboxPosition;
            var s = checkboxSizes;
            var innerboxPosition = [
                Math.round(0.5 * (p[0] + (p[0] + s[0]) - innerSize)),
                Math.round(0.5 * (p[1] + (p[1] + s[1]) - innerSize)),
            ];

            this._box(
                innerboxPosition,
                [innerSize, innerSize], isHover ? this.checkboxInnerColorHover : this.checkboxInnerColor, 1);
        }

        // now render checkbox label.
        var labelPosition = [checkboxPosition[0] + checkboxSizes[0] + this.widgetLabelHorizontalSpacing, checkboxPosition[1]]
        var labelStrSizes = [this._getTextSizes(labelStr)[0], checkboxSizes[1]];
        this._textCenter(labelPosition, labelStrSizes, labelStr);

        this.prevWidgetSizes = [checkboxSizes[0] + labelStrSizes[0], checkboxSizes[1]];
    }

    draggerFloat2 = function (labelStr, value, minMaxValues, subLabels) {
        this._draggerFloatN(labelStr, value, 2, minMaxValues, subLabels);
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
        var text = labelStr ;


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

    
    private _slider(labelStr, value, min, max, doRounding, numDecimalDigits): void {

        this._moveWindowCaret();

        /*
         SLIDER IO
         */

        var sliderPosition = this.windowCaret;
        var widgetId = hashString(labelStr);

        // * if we use the height of a single digit, we know that the slider will always be high enough.
        // (since all digits have equal height in our font).
        // * also, we dynamically determine the slider width, based on the window width.
        var sliderSizes = [
            (this.windowSizes[0] - 2 * this.windowSpacing) * this.widgetHorizontalGrowRatio,
            this._getTextSizes("0")[1] + 2 * this.sliderVerticalSpacing
        ];

        var mouseCollision = this._inBox(sliderPosition, sliderSizes, this.io.mousePositionCur);

        if (
            mouseCollision &&
            this.io.mouseLeftDownCur == true && this.io.mouseLeftDownPrev == false) {
            // if slider is clicked, it becomes active.
            this.activeWidgetId = widgetId;
        }

        if (this.activeWidgetId == widgetId) {
            // if the mouse is clicking on the slider, we modify `value.val` based
            // on the x-position of the mouse.

            var xMax = sliderPosition[0] + sliderSizes[0];
            var xMin = sliderPosition[0];

            /*
             Values larger than xMin and xMax should not overflow or underflow the slider.
             */
            var mouseX = clamp(this.io.mousePositionCur[0], xMin, xMax);

            value.val = (max - min) * ((mouseX - xMin) / (xMax - xMin)) + min;

            if (doRounding)
                value.val = Math.round(value.val);

            this.activeWidgetId = widgetId;

        }

        /*
         If either widget is active, OR we are hovering but not clicking,
         switch to hover color.
         */
        var isHover = (this.activeWidgetId == widgetId) || (mouseCollision && !this.io.mouseLeftDownCur);


        /*
         SLIDER RENDERING
         */

        /*
         Compute slider fill. Measures how much of the slider is filled.
         In range [0,1]
         */
        var sliderFill = (value.val - min) / (max - min);

        var sliderValueStr = value.val.toFixed(doRounding ? 0 : numDecimalDigits);

        this._box(
            sliderPosition,
            sliderSizes, isHover ? this.sliderBackgroundColorHover : this.sliderBackgroundColor, 1);

        /*
         Now fill the slider based on `sliderFill`
         */
        this._box(
            sliderPosition,
            [sliderSizes[0] * sliderFill, sliderSizes[1]],
            isHover ? this.sliderFillColorHover : this.sliderFillColor, 1);

        var sliderValueStrSizes = this._getTextSizes(sliderValueStr);


        // render text in slider
        this._textCenter(sliderPosition, sliderSizes, sliderValueStr);

        // now render slider label.
        var sliderLabelPosition = [sliderPosition[0] + sliderSizes[0] + this.widgetLabelHorizontalSpacing, sliderPosition[1]]
        var sliderLabelStrSizes = [this._getTextSizes(labelStr)[0], sliderSizes[1]];
        this._textCenter(sliderLabelPosition, sliderLabelStrSizes, labelStr);

        this.prevWidgetSizes = [sliderSizes[0] + sliderLabelStrSizes[0], sliderSizes[1]];

    }

    
    _moveWindowCaret(): void {

        if (this.prevWidgetSizes == null) {
            // we have not yet laid out the first widget. Do nothing.
            return;
        }

        if (this.sameLineActive) {
            this.windowCaret = [this.windowCaret[0] + this.widgetSpacing + this.prevWidgetSizes[0], this.windowCaret[1]];
        } else {
            this.windowCaret = [this.windowSpacing + this.windowPosition[0], this.windowCaret[1] + this.widgetSpacing + this.prevWidgetSizes[1]];
        }

        // the user have to explicitly call sameLine() again if we he wants samLineActive again.
        this.sameLineActive = false;

    };

    private lastProgram: any;
    private lastElementArrayBuffer: any;
    private lastArrayBuffer: any;
    private lastTexture: any;
    private lastEnableDepthTest: any;
    private lastEnableBlend: any;
    _backupGLState(gl):void {

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

    _restoreGLState(gl): void {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.lastElementArrayBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.lastArrayBuffer);
        gl.useProgram(this.lastProgram);
        gl.bindTexture(gl.TEXTURE_2D, this.lastTexture);

        if (this.lastEnableDepthTest) gl.enable(gl.DEPTH_TEST); else gl.disable(gl.DEPTH_TEST);
        if (this.lastEnableBlend) gl.enable(gl.BLEND); else gl.disable(gl.BLEND);
    }





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

    _text: (position, str) => void;
    _textCenter: (p, s, str) => void;
    textLine: (str) => void;
    _getTextSizes: (str) => [number, number];
    _getCharDesc: (char) => any;
}

class ButtonRenderer {

}

class TextRenderer implements BaseRenderer {
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

class RadioButtonRenderer {

}

class DraggerRenderer {

}

class CheckboxRenderer {

}

Shared.applyMixins(Window, [BaseRenderer, TextRenderer, ButtonRenderer, RadioButtonRenderer, DraggerRenderer, CheckboxRenderer]);