import { XamlMarkup } from "./../Reader/XamlMarkup";
import { FrameworkElement } from "./../Jupiter/FrameworkElement";
import { Grid } from "./../Jupiter/Controls/Grid";
import { ToolTip } from "./../Jupiter/Controls/ToolTip";
import { Button } from "./../Jupiter/Controls/Button";
import { StackPanel } from "./../Jupiter/Controls/StackPanel";
import { Image } from "./../Jupiter/Controls/Image";
import { CheckBox } from "./../Jupiter/Controls/CheckBox";
import { RadioButton } from "./../Jupiter/Controls/RadioButton";
import { Panel } from "./../Jupiter/Controls/Panel";
import { TextBlock } from "./../Jupiter/Controls/TextBlock";
import { ScrollBar } from "./../Jupiter/Controls/ScrollBar";
import { ContentControl } from "./../Jupiter/Controls/ContentControl";
import { ScrollViewer } from "./../Jupiter/Controls/ScrollViewer";
import { ListView } from "./../Jupiter/Controls/ListView";
import { ListViewItem } from "./../Jupiter/Controls/ListViewItem";
import { DropdownList } from "./../Jupiter/Controls/DropdownList";
import { TextBox } from "./../Jupiter/Controls/TextBox";
import { Path } from "./../Jupiter/Controls/Path";
import { Rectangle } from "./../Jupiter/Controls/Rectangle";
import { Thickness } from "./../DataTypes/Thickness";
import { HorizontalAlignment } from "./../DataTypes/HorizontalAlignment";
import { VerticalAlignment } from "./../DataTypes/VerticalAlignment";
import { CornerRadius } from "./../DataTypes/CornerRadius";
import { Orientation } from "./../DataTypes/Orientation";
import { TextWrapping } from "./../DataTypes/TextWrapping";
import { TextWrappingAlign } from "./../DataTypes/TextWrappingAlign";
import { DockPosition } from "./../DataTypes/DockPosition";
import { ConsoleHelper } from "./../Utils/ConsoleHelper";
import { GroupingHelper } from "./../Utils/GroupingHelper";
import { VisualTreeHelper } from "./../Utils/VisualTreeHelper";

export class XamlParser {
    public static XamlMarkupToUIElement(xaml: XamlMarkup): FrameworkElement {
        ConsoleHelper.Log("XamlHelper.XamlMarkupToUIElement");
        let ret: FrameworkElement = this.ProcessRoot(xaml.rootElement);
        // consoleHelper.Log(ret);
        return ret;
    }
    private static ProcessRoot(el: HTMLElement): FrameworkElement {
        // normally Application root xaml comes back as  #Text #Grid #Text , we only care about #Grid . 
        // #Text comes back as null from ProcessRootNode
        let col: NodeList = el.childNodes;
        for (let x: number = 0; x < col.length; x++) {
            let child: Node = col.item(x);
            let el: FrameworkElement = this.ProcessRootNode(child);
            if (el !== null) {
                return el;
            }
        }
    }
    private static ProcessRootNode(el: Node): FrameworkElement {
        let newFE: FrameworkElement = this.GetFrameworkElementByNode(el);
        VisualTreeHelper.AddFrameworkElement(newFE, null);
        if (newFE !== null && newFE instanceof Panel) {
            return this.ProcessCollectionNodes(newFE, el.childNodes);
        }
        return null;
    }
    private static ProcessCollectionNodes(root: FrameworkElement, col: NodeList): FrameworkElement {
        if (!col) {
            return null;
        }
        if (root instanceof Panel) {
            for (let x: number = 0; x < col.length; x++) {
                let node: Node = col.item(x);
                let newFE: FrameworkElement = this.ProcessNode(node, root.UniqueID);
                if (newFE !== null) {
                    root.Children.add(newFE);
                }
            }
        } else if (root instanceof ContentControl) {
            for (let x: number = 0; x < col.length; x++) {
                let node: Node = col.item(x);
                let newFE: FrameworkElement = this.ProcessNode(node, root.UniqueID);
                // alert(node + " " + newFE);
                if (newFE !== null) {
                    root.Content = newFE;
                }
            }
        } else if (root instanceof ListView) {
            if (root.Content === null) {
                root.Content = new StackPanel();
            }
            for (let x: number = 0; x < col.length; x++) {
                let node: Node = col.item(x);
                let newFE: FrameworkElement = this.ProcessNode(node, root.UniqueID);
                // alert(node + " " + newFE);
                if (newFE !== null) {
                    root.Children.add(newFE);
                }
            }
        }
        return root;
    }
    private static ProcessNode(el: Node, parentUId: string): FrameworkElement {
        let newFE: FrameworkElement = this.GetFrameworkElementByNode(el);
        VisualTreeHelper.AddFrameworkElement(newFE, parentUId);

        if (newFE instanceof Panel) {
            return this.ProcessCollectionNodes(newFE, el.childNodes);
        } else if (newFE instanceof ContentControl) {
            let cc: FrameworkElement = this.ProcessCollectionNodes(newFE, el.childNodes);
            return newFE;
        } else if (newFE instanceof ListView) {
            let cc: FrameworkElement = this.ProcessCollectionNodes(newFE, el.childNodes);
            // console.log(cc);
            return newFE;
        } else {
            return newFE;
        }
    }
    private static GetFrameworkElementByNode(node: Node): FrameworkElement {
        // consoleHelper.Log("XamlHelper.GetFrameworkElementByNode : " + node.nodeName);
        if (node.nodeName === "Rectangle") {
            let rect: Rectangle = new Rectangle();
            rect.Name = this.StringToEmpty(node.attributes.getNamedItem("Name"));
            rect.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            rect.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
            rect.Background = node.attributes.getNamedItem("Fill").value;
            rect.BorderBrush = node.attributes.getNamedItem("Stroke").value;
            rect.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            let stokeThickness: number = this.StringToNumber(node.attributes.getNamedItem("StrokeThickness"));
            rect.BorderThickness = new Thickness(stokeThickness);
            return rect;
        } else if (node.nodeName === "Image") {
            let img: Image = new Image();
            img.Name = this.StringToEmpty(node.attributes.getNamedItem("Name"));
            img.SourceUrl = node.attributes.getNamedItem("Source").value;
            img.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            img.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
            img.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            img.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            img.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            return img;
        } else if (node.nodeName === "Grid") {
            let grid: Grid = new Grid();
            grid.Name = this.StringToEmpty(node.attributes.getNamedItem("Name"));
            grid.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            grid.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            grid.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            grid.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
            grid.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            if (node.attributes.getNamedItem("Background") !== null) {
                grid.Background = node.attributes.getNamedItem("Background").value;
            }
            return grid;
        } else if (node.nodeName === "StackPanel") {
            let stackpanel: StackPanel = new StackPanel();
            stackpanel.Name = this.StringToEmpty(node.attributes.getNamedItem("Name"));
            stackpanel.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            stackpanel.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            stackpanel.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            stackpanel.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
            stackpanel.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            stackpanel.Orientation = this.StringToOrientation(node.attributes.getNamedItem("Orientation"));
            if (node.attributes.getNamedItem("Background") !== null) {
                stackpanel.Background = node.attributes.getNamedItem("Background").value;
            }
            return stackpanel;
        } else if (node.nodeName === "Text") {
            let text: TextBlock = new TextBlock();
            text.Name = this.StringToEmpty(node.attributes.getNamedItem("Name"));
            text.Text = node.attributes.getNamedItem("Text").value;
            text.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            text.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            text.Color = node.attributes.getNamedItem("Color").value;
            text.FontSize = this.StringToNumber(node.attributes.getNamedItem("FontSize"));
            text.FontFamily = node.attributes.getNamedItem("FontFamily").value;
            text.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            text.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            text.TextWrapping = this.StringToTextWrapping(node.attributes.getNamedItem("TextWrapping"));
            text.TextWrappingAlign = this.StringToTextWrappingAlign(node.attributes.getNamedItem("TextWrappingAlign"));
            return text;
        } else if (node.nodeName === "TextBox") {
            let text: TextBox = new TextBox();
            text.Name = this.StringToEmpty(node.attributes.getNamedItem("Name"));
            text.Text = node.attributes.getNamedItem("Text").value;
            text.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            text.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            text.Color = node.attributes.getNamedItem("Color").value;
            text.FontSize = this.StringToNumber(node.attributes.getNamedItem("FontSize"));
            text.FontFamily = node.attributes.getNamedItem("FontFamily").value;
            text.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            text.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            text.TextWrapping = this.StringToTextWrapping(node.attributes.getNamedItem("TextWrapping"));
            text.TextWrappingAlign = this.StringToTextWrappingAlign(node.attributes.getNamedItem("TextWrappingAlign"));
            text.AcceptsReturn = this.StringToBoolean(node.attributes.getNamedItem("AcceptsReturn"));
            text.Background = node.attributes.getNamedItem("Background").value;
            text.BorderBrush = node.attributes.getNamedItem("BorderBrush").value;
            let borderThickness: number = this.StringToNumber(node.attributes.getNamedItem("Border"));
            text.BorderThickness = new Thickness(borderThickness);
            return text;
        } else if (node.nodeName === "Button") {
            let button: Button = new Button();
            button.Name = this.StringToEmpty(node.attributes.getNamedItem("Name"));
            button.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            button.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            button.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            button.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
            button.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            if (node.attributes.getNamedItem("Background") !== null) {
                button.Background = node.attributes.getNamedItem("Background").value;
            }
            button.BorderBrush = node.attributes.getNamedItem("Stroke").value;
            let stokeThickness: number = this.StringToNumber(node.attributes.getNamedItem("StrokeThickness"));
            button.BorderThickness = new Thickness(stokeThickness);
            button.CornerRadius = this.StringToCornerRadius(node.attributes.getNamedItem("CornerRadius"));
            button.BlurAmount = this.StringToNumber(node.attributes.getNamedItem("BlurAmount"));
            button.ClickStr = this.StringToEmpty(node.attributes.getNamedItem("Click"));
            button.HasToolTip = this.StringToBoolean(node.attributes.getNamedItem("HasToolTip"));
            button.TooltipDockPosition = this.StringToDockPosition(node.attributes.getNamedItem("TooltipDockPosition"));
            button.TooltipWidth = this.StringToNumber(node.attributes.getNamedItem("TooltipWidth"));
            button.TooltipHeight = this.StringToNumber(node.attributes.getNamedItem("TooltipHeight"));
            button.TooltipMargin = this.StringToThickness(node.attributes.getNamedItem("TooltipMargin"));
            button.TooltipBorder = this.StringToColor(node.attributes.getNamedItem("TooltipBorder"));
            button.TooltipBackground = this.StringToColor(node.attributes.getNamedItem("TooltipBackground"));
            return button;
        } else if (node.nodeName === "ToolTip") {
            let tooltip: ToolTip = new ToolTip();
            tooltip.Name = this.StringToEmpty(node.attributes.getNamedItem("Name"));
            tooltip.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            tooltip.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            tooltip.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            tooltip.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
            tooltip.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            tooltip.TooltipDockPosition = this.StringToDockPosition(node.attributes.getNamedItem("TooltipDockPosition"));
            tooltip.TooltipBorder = this.StringToColor(node.attributes.getNamedItem("TooltipBorder"));
            tooltip.TooltipBackground = this.StringToColor(node.attributes.getNamedItem("TooltipBackground"));
            tooltip.Background = this.StringToColor(node.attributes.getNamedItem("Background"));
            return tooltip;
        } else if (node.nodeName === "Path") {
            let path: Path = new Path();
            path.Name = this.StringToEmpty(node.attributes.getNamedItem("Name"));
            path.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            path.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            path.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            path.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
            if (node.attributes.getNamedItem("Scale")) {
                path.Scale = this.StringToNumberFloat(node.attributes.getNamedItem("Scale"));
            }
            path.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            path.Data = node.attributes.getNamedItem("Data").value;
            path.Stroke = node.attributes.getNamedItem("Stroke").value;
            path.StrokeThickness = this.StringToNumber(node.attributes.getNamedItem("StrokeThickness"));
            if (node.attributes.getNamedItem("Fill")) {
                path.Fill = node.attributes.getNamedItem("Fill").value;
            } else {
                path.Fill = "";
            }
            if (node.attributes.getNamedItem("IsSmooth")) {
                path.IsSmooth = this.StringToBoolean(node.attributes.getNamedItem("IsSmooth"));
            }
            return path;
        } else if (node.nodeName === "CheckBox") {
            let cb: CheckBox = new CheckBox();
            cb.Name = this.StringToEmpty(node.attributes.getNamedItem("Name"));
            cb.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            cb.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            cb.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            cb.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
            cb.CheckedScale = this.StringToNumberFloat(node.attributes.getNamedItem("CheckedScale"), 1);
            cb.UnCheckedScale = this.StringToNumberFloat(node.attributes.getNamedItem("UnCheckedScale"), 1);
            cb.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            if (node.attributes.getNamedItem("Foreground")) {
                cb.Foreground = node.attributes.getNamedItem("Foreground").value;
            }
            if (node.attributes.getNamedItem("CheckedPath")) {
                cb.CheckedPath = node.attributes.getNamedItem("CheckedPath").value;
            }
            if (node.attributes.getNamedItem("UncheckedPath")) {
                cb.UncheckedPath = node.attributes.getNamedItem("UncheckedPath").value;
            }
            if (node.attributes.getNamedItem("CheckedPadding")) {
                cb.CheckedPadding = this.StringToThickness(node.attributes.getNamedItem("CheckedPadding"));
            }
            return cb;
        } else if (node.nodeName === "RadioButton") {
            let rb: RadioButton = new RadioButton();
            rb.Name = this.StringToEmpty(node.attributes.getNamedItem("Name"));
            rb.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            rb.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            rb.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            rb.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
            rb.CheckedScale = this.StringToNumberFloat(node.attributes.getNamedItem("CheckedScale"), 0.8);
            rb.UnCheckedScale = this.StringToNumberFloat(node.attributes.getNamedItem("UnCheckedScale"), 1);
            rb.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            if (node.attributes.getNamedItem("Foreground")) {
                rb.Foreground = node.attributes.getNamedItem("Foreground").value;
            }
            if (node.attributes.getNamedItem("CheckedPath")) {
                rb.CheckedPath = node.attributes.getNamedItem("CheckedPath").value;
            }
            if (node.attributes.getNamedItem("UncheckedPath")) {
                rb.UncheckedPath = node.attributes.getNamedItem("UncheckedPath").value;
            }
            if (node.attributes.getNamedItem("CheckedPadding")) {
                rb.CheckedPadding = this.StringToThickness(node.attributes.getNamedItem("CheckedPadding"));
            }
            rb.Grouping = this.StringToEmpty(node.attributes.getNamedItem("Grouping"));
            this.DoGroupingStuff(rb.Grouping, rb);
            return rb;
        } else if (node.nodeName === "ScrollBar") {
            let ctl: ScrollBar = new ScrollBar();
            ctl.Name = this.StringToEmpty(node.attributes.getNamedItem("Name"));
            ctl.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            ctl.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            ctl.Orientation = this.StringToOrientation(node.attributes.getNamedItem("Orientation"));
            ctl.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            ctl.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            ctl.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
            ctl.LargeChange = this.StringToNumber(node.attributes.getNamedItem("LargeChange"));
            ctl.Maximum = this.StringToNumber(node.attributes.getNamedItem("Maximum"));
            ctl.Minimum = this.StringToNumber(node.attributes.getNamedItem("Minimum"));
            ctl.SmallChange = this.StringToNumber(node.attributes.getNamedItem("SmallChange"));
            ctl.Value = this.StringToNumber(node.attributes.getNamedItem("Value"));
            return ctl;
        } else if (node.nodeName === "ListView") {
            let ctl: ListView = new ListView();
            ctl.Name = this.StringToEmpty(node.attributes.getNamedItem("Name"));
            ctl.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            ctl.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            ctl.Orientation = this.StringToOrientation(node.attributes.getNamedItem("Orientation"));
            ctl.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            ctl.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            ctl.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
            return ctl;
        } else if (node.nodeName === "DropdownList") {
            let ctl: DropdownList = new DropdownList();
            ctl.Name = this.StringToEmpty(node.attributes.getNamedItem("Name"));
            ctl.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            ctl.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            ctl.Orientation = this.StringToOrientation(node.attributes.getNamedItem("Orientation"));
            ctl.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            ctl.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            ctl.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
            return ctl;
        } else if (node.nodeName === "ScrollViewer") {
            let ctl: ScrollViewer = new ScrollViewer();
            ctl.Name = this.StringToEmpty(node.attributes.getNamedItem("Name"));
            ctl.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            ctl.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            ctl.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            ctl.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            ctl.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
            // ctl.Content = 
            return ctl;
        } else if (node.nodeName === "ListViewItem") {
            let ctl: ListViewItem = new ListViewItem();
            ctl.Name = this.StringToEmpty(node.attributes.getNamedItem("Name"));
            ctl.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            ctl.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            ctl.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            ctl.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            ctl.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
            return ctl;
        }
        return null;
    }
    private static DoGroupingStuff(grouping: string, fe: FrameworkElement): void {
        GroupingHelper.AddFrameworkElement(grouping, fe);
    }
    // 0,0,0,0 = left, top, right, bottom<--
    private static StringToThickness(attr: Attr): Thickness {
        if (attr === null) {
            return new Thickness(0);
        }

        let margin: Thickness = new Thickness(0);
        let parts: string[] = attr.value.split(",");
        margin.Left = Number.parseInt(parts[0]);
        margin.Top = Number.parseInt(parts[1]);
        margin.Right = Number.parseInt(parts[2]);
        margin.Bottom = Number.parseInt(parts[3]);
        return margin;
    }
    private static StringToCornerRadius(attr: Attr): CornerRadius {
        if (attr === null) {
            return new CornerRadius(0);
        }
        if (attr.value.indexOf(",") > 0) {
            let radius: CornerRadius = new CornerRadius(0);
            let parts: string[] = attr.value.split(",");
            radius.BottomLeft = Number.parseInt(parts[0]);
            radius.TopLeft = Number.parseInt(parts[1]);
            radius.TopRight = Number.parseInt(parts[2]);
            radius.BottomLeft = Number.parseInt(parts[3]);
            return radius;
        } else {
            return new CornerRadius(Number.parseInt(attr.value));
        }
    }
    private static StringToHorizontalAlignment(attr: Attr): HorizontalAlignment {
        if (attr === null) {
            return HorizontalAlignment.Stretch;
        }

        if (attr.value === "Left") {
            return HorizontalAlignment.Left;
        } else if (attr.value === "Center") {
            return HorizontalAlignment.Center;
        } else if (attr.value === "Right") {
            return HorizontalAlignment.Right;
        } else if (attr.value === "Stretch") {
            return HorizontalAlignment.Stretch;
        }
    }
    private static StringToNumber(attr: Attr): number {
        if (attr === null) {
            return 0;
        }
        return Number.parseInt(attr.value);
    }
    private static StringToColor(attr: Attr, emptyCol: string = "#FFFFFFFF"): string {
        if (attr === null) {
            return emptyCol;
        }
        return attr.value;
    }
    private static StringToNumberFloat(attr: Attr, defaultValue: number = 0): number {
        if (attr === null) {
            return defaultValue;
        }
        return Number.parseFloat(attr.value);
    }
    private static StringToBoolean(attr: Attr): boolean {
        if (attr === null) {
            return false;
        }
        if (attr.value.toLowerCase() === "true") {
            return true;
        } else {
            return false;
        }
    }
    private static StringToEmpty(attr: Attr): string {
        if (attr === null) {
            return "";
        }
        return attr.value;
    }
    private static StringToVerticalAlignment(attr: Attr): VerticalAlignment {
        if (attr === null) {
            return VerticalAlignment.Stretch;
        }

        if (attr.value === "Bottom") {
            return VerticalAlignment.Bottom;
        } else if (attr.value === "Center") {
            return VerticalAlignment.Center;
        } else if (attr.value === "Top") {
            return VerticalAlignment.Top;
        } else if (attr.value === "Stretch") {
            return VerticalAlignment.Stretch;
        }
    }
    private static StringToOrientation(attr: Attr): Orientation {
        if (attr === null) {
            return Orientation.Horizontal;
        }

        if (attr.value === "Horizontal") {
            return Orientation.Horizontal;
        } else if (attr.value === "Vertical") {
            return Orientation.Vertical;
        }
    }
    private static StringToTextWrapping(attr: Attr): TextWrapping {
        if (attr === null) {
            return TextWrapping.NoWrap;
        }

        if (attr.value === "NoWrap") {
            return TextWrapping.NoWrap;
        } else if (attr.value === "WrapWholeWords") {
            return TextWrapping.WrapWholeWords;
        } else if (attr.value === "Wrap") {
            return TextWrapping.Wrap;
        }
    }
    private static StringToTextWrappingAlign(attr: Attr): TextWrappingAlign {
        if (attr === null) {
            return TextWrappingAlign.Left;
        }

        if (attr.value === "Left") {
            return TextWrappingAlign.Left;
        } else if (attr.value === "Center") {
            return TextWrappingAlign.Center;
        } else if (attr.value === "Right") {
            return TextWrappingAlign.Right;
        }
    }
    private static StringToDockPosition(attr: Attr): DockPosition {
        if (attr === null) {
            return DockPosition.Top;
        }

        if (attr.value === "Left") {
            return DockPosition.Left;
        } else if (attr.value === "Top") {
            return DockPosition.Top;
        } else if (attr.value === "Right") {
            return DockPosition.Right;
        } else if (attr.value === "Bottom") {
            return DockPosition.Bottom;
        }
    }
}