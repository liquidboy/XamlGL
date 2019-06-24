import { UIElement } from "../UIElement";
import { AnimationCollection } from "./Core";
import { AnimatableUIElement } from "../Core";

export class Animations extends UIElement {
    private _animations: AnimationCollection;
    
    get Animations(): AnimationCollection { return this._animations; }
    
    set Animations(value: AnimationCollection) { this._animations = value; }
   
    constructor() {
        super();
        this._animations = new AnimationCollection();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            (parent as AnimatableUIElement).Animations = this;
            return true;
        }
        return false;
    }
}