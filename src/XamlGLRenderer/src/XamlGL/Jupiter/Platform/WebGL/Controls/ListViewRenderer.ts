import { IControlRenderer } from "./../../IControlRenderer";
// import { BaseRenderer } from "./BaseRenderer";
import { BaseScrollRenderer } from "./BaseScrollRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { ListView } from "./../../../Controls/ListView";
import { ListViewItem } from "./../../../Controls/ListViewItem";
import { StackPanel } from "./../../../Controls/StackPanel";
import { Panel } from "./../../../Controls/Panel";
// import { StackPanelRenderer } from "./StackPanelRenderer";
// import { ScrollBar } from "./../../../Controls/ScrollBar";
import { TextBlock } from "./../../../Controls/TextBlock";
import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";
import { Orientation } from "./../../../../DataTypes/Orientation";
import { Point } from "./../../../../DataTypes/Point";
// import { TextWrapping } from "./../../../../DataTypes/TextWrapping";
// import { TextWrappingAlign } from "./../../../../DataTypes/TextWrappingAlign";
import { IRenderer } from "./../../IRenderer";
import { IEventArgs } from "./../../../../Events/IEventArgs";
import { RendererHelper } from "./../../../../utils/RendererHelper";
// import { Thickness } from "./../../../../DataTypes/Thickness";

export class ListViewRenderer extends BaseScrollRenderer implements IControlRenderer {
    private _listViewEl: ListView = null;
    private _listViewElRootContainer: StackPanel = null;
    private _selected: PIXI.Graphics = null;
    private _background: PIXI.Graphics = null;
    Draw(r: IRenderer, args: IEventArgs): void {
        super.Draw(r,args);
        // fill from Draw
    }
    InitializeResources(): void {
        super.InitializeResources();
        ConsoleHelper.Log("ListViewRenderer.InitializeResources");

        this._listViewEl = <ListView>super.Element;
        if (this.PixiElement === undefined) {
            this.PixiElement = new PIXI.Container();
            this.PixiElementMask = new PIXI.Graphics();
            this.PixiElement.mask = this.PixiElementMask;
            this._background = new PIXI.Graphics();
            // this._selected = new PIXI.Graphics();
            this._background.mask = this.PixiElementMask;
        }

        // let parentContainer: PIXI.Container = <PIXI.Container>super.Element.Parent.Renderer.PixiElement;

        // this.PixiElement = text;

        // calculate y position
        this.CalculateYHeight(this._listViewEl);

        // calculate X position
        this.CalculateXWidth(this._listViewEl);

        // take margin into account
        this.UpdateCalculatedValuesUsingMargin(this._listViewEl);

        // determine starting SLOT if the parent is a PANEL that lays out its children
        let parentXYStart: Point = this.CalculateCurrentAvailableSlot();

        // position container
        this.PixiElement.position.set(this.Element.CalculatedX + parentXYStart.X, this.Element.CalculatedY + parentXYStart.Y);

        // size container
        (<PIXI.Container>this.PixiElement).height = this.Element.CalculatedHeight;
        (<PIXI.Container>this.PixiElement).width = this.Element.CalculatedWidth;

        // mask
        this.PixiElementMask.clear();
        this.PixiElementMask.beginFill(RendererHelper.HashToColorNumber("#FF000000"), 1);
        this.PixiElementMask.drawRect(0, 0, this._listViewEl.CalculatedWidth, this._listViewEl.CalculatedHeight);
        this.PixiElementMask.endFill();

        // initialize the root and children content
        this.InitListViewItems();

        this.InitBackground(this._background, parentXYStart, this._listViewEl.CalculatedWidth,
            this._listViewEl.CalculatedHeight, this._listViewEl.BackgroundAlpha);

        // this.InitSelected(this._selected, this._listViewEl.CalculatedWidth,30,0.5);

        // render graphics (DisplayObject) on PIXI stage
        let parentContainer: PIXI.Container = null;
        if (this.Element.Parent.Renderer === undefined) { // root panel (top of visual tree)
            this.Element.Platform.Renderer.PixiStage.addChild(this.PixiElementMask);
            this.Element.Platform.Renderer.PixiStage.addChild(this._background);
            // this.Element.Platform.Renderer.PixiStage.addChild(this._selected);
            this.Element.Platform.Renderer.PixiStage.addChild(this.PixiElement);
        } else {
            if (this.Element.Parent.Renderer.PixiElement && this.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                parentContainer = <PIXI.Container>this.Element.Parent.Renderer.PixiElement;
                parentContainer.addChild(this.PixiElementMask);
                parentContainer.addChild(this._background);
                // parentContainer.addChild(this._selected);
                parentContainer.addChild(this.PixiElement);
            }
        }

        if (this._listViewElRootContainer !== null) {
            this._listViewElRootContainer.Orientation = this._listViewEl.Orientation;

            // scrollbar needs to be here so as to render above the top bits
            this.InitScrollbar(<Panel>this._listViewEl.Content, this._listViewEl.CalculatedWidth, this._listViewEl.CalculatedHeight, this._listViewEl.Children.size());
        }
    }
    RefreshUI(): void {
        // todo : fill with actual pixi draw stuff that is idempotent
    }
    Clear(): void {
        ConsoleHelper.Log("ListViewRenderer.Clear");

        let containerMain: PIXI.Container = null;
        let pc: PIXI.Container =  <PIXI.Container>this.Element.Parent.Renderer.PixiElement;

        if (this.PixiElement !== undefined) {
            containerMain = <PIXI.Container>this.PixiElement;
            // this.Element.Platform.Renderer.PixiStage.removeChild(containerMain);
            pc.removeChild(this.PixiElement);
            this.PixiElement = null;
        }
    }
    public InitListViewItems(): void {
        if (this._listViewEl.Children.size() > 0) {
            this._listViewElRootContainer = <StackPanel>this._listViewEl.Content;
            this._listViewElRootContainer.Orientation = this._listViewEl.Orientation; // Orientation.Vertical;
            this._listViewElRootContainer.Renderer.InitializeResources();
            this._listViewEl.Children.forEach(x => {
                let lvi: ListViewItem = <ListViewItem>x;
                let tb: TextBlock = new TextBlock();
                tb.Text = lvi.Content;
                tb.FontSize = 22;
                tb.FontFamily = "Sans-Serif";
                tb.Color = "black";
                // tb.Parent = this._listViewEl;
                // tb.Width = this._listViewEl.CalculatedWidth;
                // tb.Height = 50;
                // tb.HorizontalAlignment = HorizontalAlignment.Center;
                // tb.VerticalAlignment = VerticalAlignment.Top;
                // tb.CalculatedY = this._listViewElRootContainer.CurrentItemRenderXY;

                if (this._listViewEl.Orientation === Orientation.Vertical) {
                    tb.CalculatedX = 0;
                    tb.CalculatedY = 0; // <== this is needed as the currentitemrenderxy doubles up with calculatedx y .. need to fix this in the long run
                    lvi.CalculatedY = this._listViewElRootContainer.CurrentItemRenderXY;
                } else {
                    tb.CalculatedY = 0;
                    tb.CalculatedX = 0; // <== this is needed as the currentitemrenderxy doubles up with calculatedx y .. need to fix this in the long run
                    lvi.CalculatedX = this._listViewElRootContainer.CurrentItemRenderXY;
                }
                // console.log(this._listViewElRootContainer.CurrentItemRenderXY);
                
                // lvi.CalculatedX = tb.CalculatedX = 0; // this._listViewElRootContainer.CurrentItemRenderXY;
                // tb.Parent = <FrameworkElement>this._listViewElRootContainer;

                this._listViewElRootContainer.Children.add(tb);

                // add new tb to parent container and set its platform so it can render itself
                this._listViewElRootContainer.Platform.SetCurrent(tb, this._listViewElRootContainer);
                this._listViewElRootContainer.Platform.LoadDynamicControl(tb);

                // tell the parent stackpanel the next available slot
                // this.IncrementNextAvailableSlotOfStackPanel(this._listViewElRootContainer, this.Element.CalculatedWidth, 0);
            });
        }
    }
    public InitBackground(rectangle: PIXI.Graphics, parentXYStart: Point, width: number, height: number, alpha: number): void {
        rectangle.lineStyle(this._listViewEl.BorderThickness.Left, RendererHelper.HashToColorNumber(this._listViewEl.BorderBrush), 1);
        rectangle.beginFill(RendererHelper.HashToColorNumber(this._listViewEl.Background)); // 0x66CCFF);
        rectangle.drawRect(0, 0, width, height);
        rectangle.alpha = alpha;
        rectangle.endFill();
        rectangle.x = this.Element.CalculatedX + parentXYStart.X; // this._listViewEl.Margin.Left;
        rectangle.y = this.Element.CalculatedY + parentXYStart.Y;  // this._listViewEl.Margin.Top;
        // console.log(rectangle);
    }
    public InitSelected(rectangle: PIXI.Graphics, width: number, height: number, alpha: number): void {
        // rectangle.lineStyle(this._listViewEl.BorderThickness.Left, RendererHelper.HashToColorNumber(this._listViewEl.BorderBrush), 1);
        rectangle.beginFill(RendererHelper.HashToColorNumber(this._listViewEl.Background)); // 0x66CCFF);
        rectangle.drawRect(0, 0, width - 4, height - 4);
        rectangle.alpha = alpha;
        rectangle.endFill();
        rectangle.x = this.Element.CalculatedX + 2; // this._listViewEl.Margin.Left;
        rectangle.y = this.Element.CalculatedY + 2;  // this._listViewEl.Margin.Top;
    }

}