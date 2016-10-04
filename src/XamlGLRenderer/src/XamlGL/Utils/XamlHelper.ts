import { XamlMarkup } from "./../Reader/XamlMarkup";
import { FrameworkElement } from "./../Jupiter/FrameworkElement";
import { Grid } from "./../Controls/Grid";
import { Image } from "./../Controls/Image";
import { Panel } from "./../Controls/Panel";
import { Rectangle } from "./../Controls/Rectangle";


export class XamlHelper {
    public static XamlMarkupToUIElement(xaml: XamlMarkup): FrameworkElement {

        let ret: FrameworkElement = this.ProcessHTMLElement(xaml.rootElement);
        // console.log("XamlHelper.XamlMarkupToUIElement");
        // console.log(ret);
        return ret;
    }

    private static ProcessCollection(col: HTMLCollection): FrameworkElement {
        for (let x: number = 0; x < col.length; x++) {
            let child: Element = col.item(x);
            return this.ProcessElement(child);
        }
    }
    private static ProcessCollectionNodes(rootPanel: Panel, col: NodeList): FrameworkElement {
        for (let x: number = 0; x < col.length; x++) {
            let node: Node = col.item(x);
            let newFE: FrameworkElement = this.ProcessNode(node);
            if (newFE !== null) {
                rootPanel.Children.add(newFE);
            }
        }
        return rootPanel;
    }
    private static ProcessNode(el: Node): FrameworkElement {
        return this.GetFrameworkElement(el.nodeName, el);
    }
    private static ProcessElement(el: Element): FrameworkElement {
        let grid: Grid = new Grid();
        return this.ProcessCollectionNodes(grid, el.childNodes);
    }
    private static ProcessHTMLElement(el: HTMLElement): FrameworkElement {
        return this.ProcessCollection(el.children);
    }


    private static GetFrameworkElement(name: string, node: Node): FrameworkElement {

        if (name === "Rectangle") {
            let rect: Rectangle = new Rectangle();
            rect.Width = Number.parseInt(node.attributes.getNamedItem("Width").value);
            rect.Height = Number.parseInt(node.attributes.getNamedItem("Height").value);
            rect.Background = "Red";
            return rect;
        } else if (name === "Image") {
            let img: Image = new Image();
            img.Source = node.attributes.getNamedItem("Source").value;
            img.Width = Number.parseInt(node.attributes.getNamedItem("Width").value);
            img.Height = Number.parseInt(node.attributes.getNamedItem("Height").value);
            return img;
        }
        return null;
    }

}