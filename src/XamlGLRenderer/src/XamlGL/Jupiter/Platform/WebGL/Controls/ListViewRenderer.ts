import { IControlRenderer } from "./../../IControlRenderer";
import { BaseRenderer } from "./BaseRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
import { ListView } from "./../../../Controls/ListView";
import { ListViewItem } from "./../../../Controls/ListViewItem";
import { StackPanel } from "./../../../Controls/StackPanel";
import { Panel } from "./../../../Controls/Panel";
import { StackPanelRenderer } from "./StackPanelRenderer";
import { ScrollBar } from "./../../../Controls/ScrollBar";
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
import { Thickness } from "./../../../../DataTypes/Thickness";

export class ListViewRenderer extends BaseRenderer implements IControlRenderer {
    private _listViewEl: ListView = null;
    private _listViewElRootContainer: StackPanel = null;
    private _scrollBarVertical: ScrollBar = null;
    private _scrollBarHorizontal: ScrollBar = null;
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
        if (this._listViewEl.Children.size() > 0) {
            this._listViewElRootContainer = <StackPanel>this._listViewEl.Content;
            this._listViewElRootContainer.Orientation = Orientation.Vertical;
            this._listViewElRootContainer.Renderer.InitializeResources();
            this._listViewEl.Children.forEach(x => {
                let lvi: ListViewItem = <ListViewItem>x;
                let tb: TextBlock = new TextBlock();
                tb.Text = lvi.Content;
                tb.FontSize = 22;
                tb.FontFamily = "Sans-Serif";
                tb.Color = "black"
                // console.log(this._listViewElRootContainer.CurrentItemRenderXY);
                tb.CalculatedY = this._listViewElRootContainer.CurrentItemRenderXY;
                // tb.Parent = <FrameworkElement>this._listViewElRootContainer;
                
                this._listViewElRootContainer.Children.add(tb);

                // add new tb to parent container and set its platform so it can render itself
                this._listViewElRootContainer.Platform.SetCurrent(tb, this._listViewElRootContainer);
                this._listViewElRootContainer.Platform.LoadDynamicControl(tb);
                
                // tell the parent stackpanel the next available slot
                // this.IncrementNextAvailableSlotOfStackPanel(this._listViewElRootContainer, this.Element.CalculatedWidth, 0);
            });
        }


        
        // render graphics (DisplayObject) on PIXI stage
        let parentContainer: PIXI.Container = null;
        if (this.Element.Parent.Renderer === undefined) { // root panel (top of visual tree)
            this.Element.Platform.Renderer.PixiStage.addChild(this.PixiElement);
            this.Element.Platform.Renderer.PixiStage.addChild(this.PixiElementMask);
        } else {
            if (this.Element.Parent.Renderer.PixiElement && this.Element.Parent.Renderer.PixiElement instanceof PIXI.Container) {
                parentContainer = <PIXI.Container>this.Element.Parent.Renderer.PixiElement;
                parentContainer.addChild(this.PixiElementMask);
                parentContainer.addChild(this.PixiElement);
            }
        }

        this.InitScrollbar();
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
    public InitScrollbar(): void {
        if (this._listViewEl.Content instanceof StackPanel) {
            let sp: StackPanel = <StackPanel>this._listViewEl.Content;
            if (sp.Orientation === Orientation.Vertical) {
                this.InitVerticalScrollbar();
            } else {
                this.InitHorizontalScrollbar();
            }
        }
    }
    private InitHorizontalScrollbar(): void {
        if (this._scrollBarHorizontal === null) {
            this._scrollBarHorizontal = new ScrollBar();
        }
        let sbParent: Panel = <Panel>this.Element.Parent;
        this._scrollBarHorizontal.HorizontalAlignment = HorizontalAlignment.Stretch;
        this._scrollBarHorizontal.VerticalAlignment = VerticalAlignment.Bottom;
        this._scrollBarHorizontal.Margin = new Thickness(0);
        this._scrollBarHorizontal.Orientation = Orientation.Horizontal;
        this._scrollBarHorizontal.LargeChange = 1;
        this._scrollBarHorizontal.SmallChange = 1;
        this._scrollBarHorizontal.Maximum = 300;
        this._scrollBarHorizontal.Minimum = 0;
        this._scrollBarHorizontal.Value = 0;
        this._scrollBarHorizontal.Height = 20;
        this._scrollBarHorizontal.ValueChanged.subscribe((sb: ScrollBar, args: IEventArgs) => {
            let ratio: number = sb.Value / (sb.Maximum - sb.Minimum);
            // console.log(ratio);

            if (this._listViewEl.Content instanceof StackPanel) {
                let sp: StackPanel = <StackPanel>this._listViewEl.Content;

                let contentWidth: number = sp.Renderer.PixiElement.getBounds().width;
                let svWidth: number = this._listViewEl.CalculatedWidth;
                let diff: number = contentWidth - svWidth;
                // console.log(diff);
                (<StackPanelRenderer>sp.Renderer).UpdateOffset(-1 * diff * ratio, 0);
            }

        });
        if (this.Element.Parent instanceof Panel) {
            sbParent.Platform.SetCurrent(this._scrollBarHorizontal, sbParent);
            sbParent.Platform.LoadDynamicControl(this._scrollBarHorizontal);
        }
    }
    private InitVerticalScrollbar(): void {
        if (this._scrollBarVertical === null) {
            this._scrollBarVertical = new ScrollBar();
        }
        let sbParent: Panel = <Panel>this.Element.Parent;
        this._scrollBarVertical.HorizontalAlignment = HorizontalAlignment.Right;
        this._scrollBarVertical.VerticalAlignment = VerticalAlignment.Stretch;
        this._scrollBarVertical.Margin = new Thickness(0);
        this._scrollBarVertical.Orientation = Orientation.Vertical;
        this._scrollBarVertical.LargeChange = 1;
        this._scrollBarVertical.SmallChange = 1;
        this._scrollBarVertical.Maximum = 300;
        this._scrollBarVertical.Minimum = 0;
        this._scrollBarVertical.Value = 0;
        this._scrollBarVertical.Width = 20;
        this._scrollBarVertical.ValueChanged.subscribe((sb: ScrollBar, args: IEventArgs) => {
            let ratio: number = sb.Value / (sb.Maximum - sb.Minimum);
            // console.log(ratio);

            if (this._listViewEl.Content instanceof StackPanel) {
                let sp: StackPanel = <StackPanel>this._listViewEl.Content;

                let contentHeight: number = sp.Renderer.PixiElement.getBounds().height;
                let svHeight: number = this._listViewEl.CalculatedHeight;
                let diff: number = contentHeight - svHeight;
                // console.log(-1 * diff * ratio);
                (<StackPanelRenderer>sp.Renderer).UpdateOffset(0, -1 * diff * ratio);
            }

        });
        if (this.Element.Parent instanceof Panel) {
            sbParent.Platform.SetCurrent(this._scrollBarVertical, sbParent);
            sbParent.Platform.LoadDynamicControl(this._scrollBarVertical);
        }
    }
}