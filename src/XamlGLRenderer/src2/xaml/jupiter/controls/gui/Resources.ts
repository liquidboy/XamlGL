import { UIElement } from "../../UIElement";
import { UIElementCollection } from "../../Core";

export class Resources extends UIElement {
    private _resources: UIElementCollection;
    
    get Resources(): UIElementCollection { return this._resources; }
    
    set Resources(value: UIElementCollection) { this._resources = value; }
   
    constructor() {
        super();
        this._resources = new UIElementCollection();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
    }
}