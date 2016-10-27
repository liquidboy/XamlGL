// import { FrameworkElementCollection } from "./../Jupiter/FrameworkElementCollection";
import { FrameworkElement } from "./../Jupiter/FrameworkElement";
import { LinkedList } from "./../../Libs/typescript-collections/src/lib/index";
import { VisualTree, VisualTreeNode } from "./../VisualTree";
import { ConsoleHelper } from "./../Utils/ConsoleHelper";

export class VisualTreeHelper {

    private static _elementList: LinkedList<FrameworkElement> = new LinkedList<FrameworkElement>();
    private static _visualTree: VisualTree = new VisualTree();

    static get XamlVT(): VisualTree { return this._visualTree; }

    public static AddFrameworkElement(element: FrameworkElement, parentId: string): void {
        if (element === null) {
            return;
        }

        this._elementList.add(element);

        // check to see if new FE already exists in the VisualTree
        let foundElement: VisualTreeNode = this._visualTree.Find(element.UniqueID);
        if (foundElement !== null) {
            return;
        }

        // this FE is not in the VisualTree so add it
        if (parentId === null) {
            this._visualTree.Children.add(new VisualTreeNode(element.Name, null, element));
        } else {
            let foundParent: VisualTreeNode = this._visualTree.Find(parentId);
            if (foundParent != null) {
                foundParent.Children.add(new VisualTreeNode(element.Name, element.UniqueID, element));
            } else {
                this._visualTree.Children.add(new VisualTreeNode(element.Name, element.UniqueID, element));
            }
        }
    }
    public static DebugVT(): void {
        ConsoleHelper.LogPad("Xaml Visual Tree (XVT)", 0);
        this.XamlVT.Children.forEach((x: VisualTreeNode) => {
            ConsoleHelper.LogPad(x.Name, 5);
            this.DebugNode(x.Children, 5);
        });
    }

    private static DebugNode(children: LinkedList<VisualTreeNode>, parentPadding: number): void {
        children.forEach((x: VisualTreeNode) => {
            ConsoleHelper.LogPad(x.Name, parentPadding + 5);
        });
    }

    public static Draw(): void {
        ConsoleHelper.LogPad("VisualTreeHelper.Draw", 0);
        this.XamlVT.Children.forEach((x: VisualTreeNode) => {
            this.DrawNode(x);
        });
    }

    private static DrawNode(x: VisualTreeNode): void {
        ConsoleHelper.LogPad("VisualTreeHelper.DrawNode", 0);
        x.BackingElement.Renderer.Draw();
        x.Children.forEach((vtn: VisualTreeNode) => {
            vtn.BackingElement.Renderer.Draw();
            if (vtn.Children.size.length > 0) {
                this.DrawNode(vtn);
            }
        });
    }
}