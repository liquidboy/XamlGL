import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
// import { IRenderer } from "./../../IRenderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { Path } from "./../../../../Controls/Path";
// import { StackPanel } from "./../../../../Controls/StackPanel";
// import { PathGeometry } from "./../../../../Controls/PathGeometry";
// import { PathFigure } from "./../../../../Controls/PathFigure";
// import { LineSegment } from "./../../../../Controls/LineSegment";
// import { BezierSegment } from "./../../../../Controls/BezierSegment";
// import { QuadraticBezierSegment } from "./../../../../Controls/QuadraticBezierSegment";
// import { ArcSegment } from "./../../../../Controls/ArcSegment";
// import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
// import { FillRule } from "./../../../../DataTypes/FillRule";
// import { SweepDirection } from "./../../../../DataTypes/SweepDirection";
// import { Size } from "./../../../../DataTypes/Size";
// import { Orientation } from "./../../../../DataTypes/Orientation";
// import { IRenderer } from "./../../IRenderer";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
import { RendererHelper } from "./../../../../utils/RendererHelper";
import { MiniPathLanguageHelper } from "./../../../../utils/MiniPathLanguageHelper";
import { Point } from "./../../../../DataTypes/Point";

export class PathRenderer extends BaseRenderer implements IControlRenderer {
    Draw(): void {
        super.Draw();
        ConsoleHelper.Log("PathRenderer.Draw");

        let pathEl: Path = <Path>super.Element;
        let parentContainer: PIXI.Container = <PIXI.Container>super.Element.Parent.Renderer.PixiElement;

        if (!pathEl.IsDirty) {
            return;
        }

        // calculate y position
        this.CalculateYHeight(pathEl);

        // calculate X position
        this.CalculateXWidth(pathEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(pathEl);

        // console.log(this.Element);

        let polygonGraphics: PIXI.Graphics = new PIXI.Graphics();
        polygonGraphics.beginFill(RendererHelper.HashToColorNumber(pathEl.Fill), pathEl.Fill.length>0?1:0);
        polygonGraphics.lineStyle(pathEl.StrokeThickness, RendererHelper.HashToColorNumber(pathEl.Stroke));

        // render path
        MiniPathLanguageHelper.parse(pathEl.Data, polygonGraphics);

        // console.log(pg.Figures);
        // pg.Figures.forEach((pf: PathFigure) => {

        // });

        // let polygon: PIXI.Polygon = new PIXI.Polygon(this.DataToNumbers(pathEl.Data));
        // polygonGraphics.drawShape(polygon);
        polygonGraphics.scale = new PIXI.Point(pathEl.Scale, pathEl.Scale);

        polygonGraphics.endFill();

        // determine starting SLOT if the parent is a PANEL that lays out its children
        let parentXYStart: Point = this.CalculateCurrentAvailableSlot();

        polygonGraphics.x = this.Element.CalculatedX + parentXYStart.X;
        polygonGraphics.y = this.Element.CalculatedY + parentXYStart.Y;

        parentContainer.addChild(polygonGraphics);

        // filters
        if (pathEl.IsSmooth) {
            let blurFilter: PIXI.filters.BlurFilter = new PIXI.filters.BlurFilter();
            blurFilter.blur = 1;
            polygonGraphics.boundsPadding = pathEl.Width + 2;
            polygonGraphics.filters = [blurFilter];
        }

        this.Element.Platform.Renderer.PixiRenderer.render(parentContainer);

        // tell the parent stackpanel the next available slot
        this.IncrementNextAvailableSlot();

        // // update the UI based on interaction events and the render DRAW loop
        // this.Element.Platform.Renderer.Draw.subscribe((r: IRenderer, args: IEventArgs) => {
        //    if (r.Pointer.hitTestSprite(parentContainer)) {
        //        this.IsBeingHitWithPointer(r, args);
        //    } else {
        //        this.IsNotBeingHitWithPointer(r, args);
        //    }
        // });



        pathEl.IsDirty = false;
    }
    RefreshUI(): void {
        // todo : fill with actual pixi draw stuff that is idempotent
    }
    // private DataToNumbers(data: string): number[] {
    //    let dataToWorkWith: string = data.substr(1, data.length-1);
    //    let ret: number[] = dataToWorkWith.split(",").map(function (item: string) {
    //        return parseFloat(item);
    //    });
    //    return ret;
    // }


}

