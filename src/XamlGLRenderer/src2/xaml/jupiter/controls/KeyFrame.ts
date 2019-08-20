import { UIElement } from "../Core";
import { KeyFrames } from "./Core";

export class KeyFrame extends UIElement {

    private _frame: number;
    private _value: number;

    get Frame(): number { return this._frame; }
    get Value(): number { return this._value; }

    set Frame(value: number) { this._frame = value; }
    set Value(value: number) { this._value = value; }

    constructor() {
        super();
    }

    public LoadFromNode(node: any): void {
        this.UpdatePropertyByNodeAndFunction(node, "Frame", "Frame", parseInt);
        this.UpdatePropertyByNodeAndFunction(node, "Value", "Value", parseFloat);
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            (parent as KeyFrames).KeyFrames.add(this);
            return true;
        }
        return false;
    }
}