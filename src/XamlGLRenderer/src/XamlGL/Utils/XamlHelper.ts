import { XamlMarkup } from "./../Reader/XamlMarkup";
import { FrameworkElement } from "./../Jupiter/FrameworkElement";
import { Grid } from "./../Controls/Grid";
import { Image } from "./../Controls/Image";
import { Panel } from "./../Controls/Panel";
import { TextBlock } from "./../Controls/TextBlock";
import { Rectangle } from "./../Controls/Rectangle";
import { Thickness } from "./../DataTypes/Thickness";
import { HorizontalAlignment } from "./../DataTypes/HorizontalAlignment";
import { VerticalAlignment } from "./../DataTypes/VerticalAlignment";
import { ConsoleHelper } from "./ConsoleHelper";

export class XamlHelper {
    public static XamlMarkupToUIElement(xaml: XamlMarkup): FrameworkElement {
        ConsoleHelper.Log("XamlHelper.XamlMarkupToUIElement");
        let ret: FrameworkElement = this.ProcessRoot(xaml.rootElement);
        // consoleHelper.Log(ret);
        return ret;
    }
    private static ProcessCollectionNodes(rootPanel: Panel, col: NodeList): FrameworkElement {
        if (!col) {
            return null;
        }

        for (let x: number = 0; x < col.length; x++) {
            let node: Node = col.item(x);
            let newFE: FrameworkElement = this.ProcessNode(node);
            if (newFE !== null) {
                rootPanel.Children.add(newFE);
            }
        }
        return rootPanel;
    }
    private static ProcessRootNode(el: Node): FrameworkElement {
        let newFE: FrameworkElement = this.GetFrameworkElementByNode(el);
        if (newFE !== null && newFE instanceof Panel) {
            return this.ProcessCollectionNodes(newFE, el.childNodes);
        }
        return null;
    }
    private static ProcessNode(el: Node): FrameworkElement {
        let newFE: FrameworkElement = this.GetFrameworkElementByNode(el);
        if (newFE instanceof Panel) {
            return this.ProcessCollectionNodes(newFE, el.childNodes);
        } else {
            return newFE;
        }
    }
    private static ProcessRoot(el: HTMLElement): FrameworkElement {
        // normally Application root xaml comes back as  #Text #Grid #Text , we only care about #Grid . 
        // #Text comes back as null from ProcessRootNode
        let col: NodeList =  el.childNodes;
        for (let x: number = 0; x < col.length; x++) {
            let child: Node = col.item(x);
            let el: FrameworkElement = this.ProcessRootNode(child);
            if (el !== null) {
                return el;
            }
        }
    }
    // private static GetFrameworkElementByElement(el: Element): FrameworkElement {
    //    // consoleHelper.Log("XamlHelper.GetFrameworkElementByElement : " + el.nodeName);
    //    if (el.nodeName === "Grid") {
    //        let grid: Grid = new Grid();
    //        grid.HorizontalAlignment = this.StringToHorizontalAlignment(el.attributes.getNamedItem("HorizontalAlignment"));
    //        grid.VerticalAlignment = this.StringToVerticalAlignment(el.attributes.getNamedItem("VerticalAlignment"));
    //        grid.Width = this.StringToNumber(el.attributes.getNamedItem("Width"));
    //        grid.Height = this.StringToNumber(el.attributes.getNamedItem("Height"));
    //        grid.Margin = this.StringToThickness(el.attributes.getNamedItem("Margin"));
    //        if (el.hasAttribute("Background")) {
    //            grid.Background = el.attributes.getNamedItem("Background").value;
    //        }
    //        return grid;
    //    }
    //    return null;
    // }

    private static GetFrameworkElementByNode(node: Node): FrameworkElement {
        // consoleHelper.Log("XamlHelper.GetFrameworkElementByNode : " + node.nodeName);
        if (node.nodeName === "Rectangle") {
            let rect: Rectangle = new Rectangle();
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
            img.SourceUrl = node.attributes.getNamedItem("Source").value;
            img.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            img.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
            img.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            img.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            return img;
        } else if (node.nodeName === "Grid") {
            let grid: Grid = new Grid();
            grid.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            grid.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            grid.Width = this.StringToNumber(node.attributes.getNamedItem("Width"));
            grid.Height = this.StringToNumber(node.attributes.getNamedItem("Height"));
            grid.Margin = this.StringToThickness(node.attributes.getNamedItem("Margin"));
            if (node.attributes.getNamedItem("Background") !== null) {
                grid.Background = node.attributes.getNamedItem("Background").value;
            }
            return grid;
        } else if (node.nodeName === "Text") {
            let text: TextBlock = new TextBlock();
            text.Text = node.attributes.getNamedItem("Text").value;
            text.HorizontalAlignment = this.StringToHorizontalAlignment(node.attributes.getNamedItem("HorizontalAlignment"));
            text.VerticalAlignment = this.StringToVerticalAlignment(node.attributes.getNamedItem("VerticalAlignment"));
            text.Color = node.attributes.getNamedItem("Color").value;
            return text;
        }
        return null;
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
}