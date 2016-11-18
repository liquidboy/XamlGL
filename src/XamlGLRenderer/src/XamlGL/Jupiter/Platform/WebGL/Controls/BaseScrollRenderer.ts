// import { IControlRenderer } from "./../../IControlRenderer";
// import { BaseScrollRenderer } from "./BaseScrollRenderer";
// import { Renderer } from "./../Renderer";
// import { VisualElementChangedEventArgs } from "./../../IFrameworkElementRenderer";
// import { FrameworkElement } from "./../../../FrameworkElement";
// import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { IEvent } from "./../../../../Events/IEvent";
// import { EventDispatcher } from "./../../../../Events/EventDispatcher";
// import { ConsoleHelper } from "./../../../../utils/ConsoleHelper";
// import { ListView } from "./../../../Controls/ListView";
// import { ListViewItem } from "./../../../Controls/ListViewItem";
import { StackPanel } from "./../../../Controls/StackPanel";
import { Panel } from "./../../../Controls/Panel";
import { StackPanelRenderer } from "./StackPanelRenderer";
import { ScrollBar } from "./../../../Controls/ScrollBar";
// import { TextBlock } from "./../../../Controls/TextBlock";
import { HorizontalAlignment } from "./../../../../DataTypes/HorizontalAlignment";
import { VerticalAlignment } from "./../../../../DataTypes/VerticalAlignment";
import { Orientation } from "./../../../../DataTypes/Orientation";
// import { Point } from "./../../../../DataTypes/Point";
// import { TextWrapping } from "./../../../../DataTypes/TextWrapping";
// import { TextWrappingAlign } from "./../../../../DataTypes/TextWrappingAlign";
// import { IRenderer } from "./../../IRenderer";
import { IEventArgs } from "./../../../../Events/IEventArgs";
// import { RendererHelper } from "./../../../../utils/RendererHelper";
import { Thickness } from "./../../../../DataTypes/Thickness";
import { BaseRenderer } from "./BaseRenderer";


export class BaseScrollRenderer extends BaseRenderer {
    _scrollBarVertical: ScrollBar = null;
    _scrollBarHorizontal: ScrollBar = null;
    _scrollViewerHeight: number = 0;
    _scrollViewerWidth: number = 0;
    _panel: Panel = null;
    public InitScrollbar(panel: Panel, scrollViewerWidth: number, scrollViewerHeight: number, scrollPrecision: number): void {
        this._panel = panel;
        this._scrollViewerHeight = scrollViewerHeight;
        this._scrollViewerWidth = scrollViewerWidth;
        if (this._panel instanceof StackPanel) {
            let sp: StackPanel = <StackPanel>this._panel;
            if (sp.Orientation === Orientation.Vertical) {
                this.InitVerticalScrollbar(scrollPrecision);
            } else {
                this.InitHorizontalScrollbar(scrollPrecision);
            }
        }
    }
    private InitHorizontalScrollbar(scrollPrecision: number): void {
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
        this._scrollBarHorizontal.Maximum = scrollPrecision;
        this._scrollBarHorizontal.Minimum = 0;
        this._scrollBarHorizontal.Value = 0;
        this._scrollBarHorizontal.Height = 20;
        this._scrollBarHorizontal.ValueChanged.subscribe((sb: ScrollBar, args: IEventArgs) => {
            let ratio: number = sb.Value / (sb.Maximum - sb.Minimum);
            // console.log(ratio);
            if (this._panel instanceof StackPanel) {
                let sp: StackPanel = <StackPanel>this._panel;

                let contentWidth: number = sp.Renderer.PixiElement.getBounds().width;
                let diff: number = contentWidth - this._scrollViewerWidth;
                // console.log(diff);
                (<StackPanelRenderer>sp.Renderer).UpdateOffset(-1 * diff * ratio, 0);
            }

        });
        if (this.Element.Parent instanceof Panel) {
            sbParent.Platform.SetCurrent(this._scrollBarHorizontal, sbParent);
            sbParent.Platform.LoadDynamicControl(this._scrollBarHorizontal);
        }
    }
    private InitVerticalScrollbar(scrollPrecision: number): void {
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
        this._scrollBarVertical.Maximum = scrollPrecision;
        this._scrollBarVertical.Minimum = 0;
        this._scrollBarVertical.Value = 0;
        this._scrollBarVertical.Width = 20;
        this._scrollBarVertical.ValueChanged.subscribe((sb: ScrollBar, args: IEventArgs) => {
            let ratio: number = sb.Value / (sb.Maximum - sb.Minimum);
            // console.log(ratio);
            if (this._panel instanceof StackPanel) {
                let sp: StackPanel = <StackPanel>this._panel;
                let contentHeight: number = sp.Renderer.PixiElement.getBounds().height;
                let diff: number = contentHeight - this._scrollViewerHeight;
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