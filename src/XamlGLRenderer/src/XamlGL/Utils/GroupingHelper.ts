import { FrameworkElementCollection } from "./../Jupiter/FrameworkElementCollection";
import { FrameworkElement } from "./../Jupiter/FrameworkElement";
import { Dictionary } from "./../../Libs/typescript-collections/src/lib/index";

export class GroupingHelper {

    private static _elementGroups: Dictionary<string, FrameworkElementCollection> = new Dictionary<string, FrameworkElementCollection>();

    public static GetElementsByGrouping(grouping: string): FrameworkElementCollection {
        return this._elementGroups.getValue(grouping);
    }

    public static AddFrameworkElement(grouping: string, element: FrameworkElement): void {
        let col: FrameworkElementCollection = null;
        if (this._elementGroups.containsKey(grouping)) {
            col = this.GetElementsByGrouping(grouping);
        } else {
            col = new FrameworkElementCollection();
            this._elementGroups.setValue(grouping, col);
        }
        col.add(element);
    }
}