import * as hashString from 'hash-string';
import * as clamp from 'clamp';
import { AppModuleShared } from '../app.module.shared';

export class Gui {

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

    // the title bar height.
    public titleBarHeight: number = 21;
    // spacing between the title bars border, and the window title.
    public titleBarVerticalSpacing: number = 6;
    // the title bar color.
    public titleBarColor = [0.2, 0.4, 0.6];


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




    private windowTitle: any;
    /* Setup geometry buffers. */
    private indexBuffer = [];
    private positionBuffer = [];
    private colorBuffer = [];
    private uvBuffer = [];
    private indexBufferIndex: number = 0;
    private positionBufferIndex: number = 0;
    private colorBufferIndex: number = 0;
    private uvBufferIndex: number = 0;
    private io: any;
    begin(io, windowTitle): void {

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

        // default value.
        if (typeof windowTitle == 'undefined') {
            windowTitle = "Window";
        }

        this.windowTitle = windowTitle;

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

        // render window.
        this._window();
    };


    private windowCaret: any;
    _window():void {

        var widgetId = hashString(this.windowTitle);

        /*
         WINDOW IO(move window when dragging the title-bar using the left mouse button)
         */

        var titleBarPosition = this.windowPosition;
        var titleBarSizes = [this.windowSizes[0], this.titleBarHeight];

        if (
            this._inBox(titleBarPosition, titleBarSizes, this.io.mousePositionCur) &&
            this.io.mouseLeftDownCur == true && this.io.mouseLeftDownPrev == false) {
            this.activeWidgetId = widgetId;
        }

        if (this.activeWidgetId == widgetId) {

            if (this._inBox(titleBarPosition, titleBarSizes, this.io.mousePositionCur)) {
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
            titleBarPosition = this.windowPosition;
        }

        /*
         WINDOW RENDERING.
         */

        // draw title bar
        this._box(titleBarPosition, titleBarSizes, this.titleBarColor);

        // draw title bar text
        this._textCenter(
            [this.windowPosition[0] + this.titleBarVerticalSpacing, this.windowPosition[1]],
            [this._getTextSizes(this.windowTitle)[0], this.titleBarHeight],
            this.windowTitle);

        // draw the actual window.
        this._box([this.windowPosition[0], this.windowPosition[1] + this.titleBarHeight], this.windowSizes,
            this.windowColor, this.windowAlpha);

        // setup the window-caret. The window-caret is where we will place the next widget in the window.
        this.windowCaret = [
            this.windowPosition[0] + this.windowSpacing,
            this.windowPosition[1] + this.windowSpacing + this.titleBarHeight];
        this.prevWidgetSizes = null; // should be null at the beginning.


        /*
         Determine whether the mouse is inside the window. We need this in some places.
         */
        this.mouseInWindow = _inBox(titleBarPosition,
            [this.windowSizes[0], this.titleBarHeight + this.windowSizes[1]],
            this.io.mousePositionCur);
    }


    _box(position, size, color, alpha): void {


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

    /* Add vertex that only has one color, and does not use a texture. */
    _coloredVertex(position, color): void {
        // at this uv-coordinate, the font atlas is entirely white.
        var whiteUv = [0.95, 0.95];

        this._addPosition(position);
        this._addColor(color);
        this._addUv(whiteUv);
    };

    public sameLine(): void {
        this.sameLineActive = true;
    }

    public sliderFloat(str, value, min, max, numDecimalDigits): void {

        if (typeof numDecimalDigits === 'undefined') {
            numDecimalDigits = 2; // default value
        }

        this._slider(str, value, min, max, false, numDecimalDigits);
    };

    _getCharDesc(char): any {
        return AppModuleShared.fontInfo.chars[char.charCodeAt(0) - 32];
    };

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

    /*
     Render a box.

     `color` is a RGB-triplet.
     the optional `alpha` argument specifies the transparency of the box.
     default value of `alpha` is 1.0
     */
    _box(position, size, color, alpha): void {


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

        var mouseCollision = _inBox(sliderPosition, sliderSizes, this.io.mousePositionCur);

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

     /*
     Given a box with position `p`, width `s[0]`, height `[1]`,
     return whether the point with the position `x` is inside the box.
     */
    _inBox(p, s, x): any {
        var minX = p[0];
        var minY = p[1];

        var maxX = p[0] + s[0];
        var maxY = p[1] + s[1];

        return (
            minX <= x[0] && x[0] <= maxX &&
            minY <= x[1] && x[1] <= maxY
        );
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
}