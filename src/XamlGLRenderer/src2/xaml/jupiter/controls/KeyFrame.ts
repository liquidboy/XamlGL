import { UIElement } from "../Core";
import { KeyFrames } from "./Core";

export class KeyFrame extends UIElement {

    private _frame: number;
    private _value: number;

    get Frame(): number { return this._frame; }
    get Value(): number { return this._value; }
    
    constructor() {
        super();
    }

    public LoadFromNode(node: any): void {
        try { this._frame = parseInt(node.attributes["Frame"].value); } catch { }
        try { this._value = parseFloat(node.attributes["Value"].value); } catch { }
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            (parent as KeyFrames).KeyFrames.add(this);
            return true;
        }
        return false;
    }
}