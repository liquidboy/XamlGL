import { XamlMarkup } from "./../reader/XamlMarkup";
import { FrameworkElement } from "./../jupiter/FrameworkElement";
import * as _controls from "./../jupiter/controls/Core";
import { UIElement } from "../jupiter/Core";
import { KeyFrames, KeyFrame, Animation, Animations } from "./../jupiter/controls/Core";

export class XamlParser {
    public static XamlMarkupToUIElement(xaml: XamlMarkup): FrameworkElement {
        // ConsoleHelper.Log("XamlHelper.XamlMarkupToUIElement");
        let nnn = new _controls.Panel();  // HACK : need to do this to init _controls :(
        return this.ProcessRoot(xaml.rootElement);
    }
    private static ProcessRoot(el: HTMLElement): FrameworkElement {
        // normally Application root xaml comes back as  #Text #Grid #Text , we only care about #Grid . 
        // #Text comes back as null from ProcessRootNode
        let col: NodeList = el.childNodes;
        for (let x: number = 0; x < col.length; x++) {
            let child: Node = col.item(x);
            let el: FrameworkElement = this.ProcessNode(child, null);
            if (el !== null) {
                return el;
            }
        }
    }
    private static ProcessNode(el: Node, parent: UIElement): FrameworkElement {
        let nodeAsAFrameWorkElement: FrameworkElement = this.GetFrameworkElementByNode(el);

        if (nodeAsAFrameWorkElement != null && parent != null) {
            //link parent to node
            nodeAsAFrameWorkElement.Parent = parent as FrameworkElement;

            //add animation to animations collection on node
            if (nodeAsAFrameWorkElement instanceof Animation && parent instanceof Animations) (parent as Animations).Animations.add(nodeAsAFrameWorkElement);

            //add keyframe to keyframes collection on node
            if (nodeAsAFrameWorkElement instanceof KeyFrame && parent instanceof KeyFrames) (parent as KeyFrames).KeyFrames.add(nodeAsAFrameWorkElement);
        }
        //VisualTreeHelper.AddFrameworkElement(newFE, parentUId);
        if (nodeAsAFrameWorkElement != null && el != null && el.childNodes != null && el.childNodes.length > 0) {
            this.ProcessNodeWithChildren(nodeAsAFrameWorkElement, el.childNodes);
        }
        return nodeAsAFrameWorkElement;
    }
    private static ProcessNodeWithChildren(root: UIElement, nodeCollection: NodeList): void {
        if (!nodeCollection) {
            return;
        }
        for (let x: number = 0; x < nodeCollection.length; x++) {
            let node: Node = nodeCollection.item(x);
            let newFE: FrameworkElement = this.ProcessNode(node, root);
            if (newFE !== null) {
            //    root.Content = newFE;
                //add child to children collection on node
                if ('Children' in root) (root as _controls.Panel).Children.setValue(newFE.Name, newFE);
                //if ('Animations' in root) root.Animations.add(newFE);
            }
        }
    }
    private static GetFrameworkElementByNode(node: any): FrameworkElement {
        // console.log(node.nodeName);
        if (node.nodeName === "#text") return null;
        try {
            let newObject: FrameworkElement = eval(`new _controls.${node.nodeName}();`);
            if (this.HasAttribute(node, "x:Name")) newObject.Name = this.TryGetAttribute(node, "x:Name");
            if ('LoadFromNode' in newObject) newObject.LoadFromNode(node);
            //if (node.nodeName === "Animation") return newObject;
            // console.log(newObject);
            return newObject;
        } catch (ex) {
            console.log(`could not find class ${node.nodeName}`);
        }
        return null;
    }
    private static HasAttribute(node: any, attributeName: string): any {
        try { return (node.attributes[attributeName].value !== null) ; }
        catch { }
        return false;
    }
    private static TryGetAttribute(node: any, attributeName: string): any {
        try { return node.attributes[attributeName].value; }
        catch { }
        return null;
    }
}