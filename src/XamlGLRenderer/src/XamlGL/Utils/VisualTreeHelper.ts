// import { FrameworkElementCollection } from "./../Jupiter/FrameworkElementCollection";
import { FrameworkElement } from "./../Jupiter/FrameworkElement";
import { LinkedList } from "./../../Libs/typescript-collections/src/lib/index";
import { VisualTree, VisualTreeNode } from "./../VisualTree";
import { ConsoleHelper } from "./../Utils/ConsoleHelper";

export class VisualTreeHelper {

    private static _elementList: LinkedList<FrameworkElement> = new LinkedList<FrameworkElement>();
    private static _visualTree: VisualTree = new VisualTree();

    static get XamlVT(): VisualTree { return this._visualTree; }
    static get ElementCount(): number { return this._elementList.size(); }

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
        // if (element) console.log(element.Name);
        // this FE is not in the VisualTree so add it
        if (parentId === null) {
            this._visualTree.Children.add(new VisualTreeNode(element.Name, null, element));
        } else {
            let foundParent: VisualTreeNode = this._visualTree.Find(parentId);
            if (foundParent != null) {
                foundParent.Children.add(new VisualTreeNode(element.Name, element.UniqueID, element));
                // console.log(foundParent);
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
            if (x.Children !== null && x.Children.size() > 0) {
                this.DebugNode(x.Children, parentPadding + 5);
            }
        });
    }

    public static Draw(): void {
        // consoleHelper.LogPad("VisualTreeHelper.Draw", 0);
        this.XamlVT.Children.forEach((x: VisualTreeNode) => {
            x.BackingElement.Renderer.Draw();
            this.DrawNode(x);
        });
    }

    private static DrawNode(x: VisualTreeNode): void {
        // consoleHelper.LogPad("VisualTreeHelper.DrawNode", 0);
        x.Children.forEach((vtn: VisualTreeNode) => {
            vtn.BackingElement.Renderer.Draw();
            if (vtn.Children !== null && vtn.Children.size() > 0) {
                this.DrawNode(vtn);
            }
        });
    }
}