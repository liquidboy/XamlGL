// import { FrameworkElementCollection } from "./../Jupiter/FrameworkElementCollection";
import { FrameworkElement } from "./../Jupiter/FrameworkElement";
import { LinkedList } from "./../../Libs/typescript-collections/src/lib/index";
import { VisualTree, VisualTreeNode } from "./../VisualTree";

export class VisualTreeHelper {

    private static _elementList: LinkedList<FrameworkElement> = new LinkedList<FrameworkElement>();
    private static _visualTree: VisualTree = new VisualTree();

    public static AddFrameworkElement(element: FrameworkElement, parentId: string): void {
        this._elementList.add(element);

        // check to see if new FE already exists in the VisualTree
        let foundElement: VisualTreeNode = this._visualTree.Find(element.UniqueID);
        if (foundElement !== null) {
            return;
        }

        // this FE is not in the VisualTree so add it
        let foundParent: VisualTreeNode = this._visualTree.Find(parentId);
        if (foundParent != null) {
            foundParent.Children.add(new VisualTreeNode(element.Name, element.UniqueID));
        } else {
            this._visualTree.Children.add(new VisualTreeNode(element.Name, element.UniqueID));
        }
    }
}