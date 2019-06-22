import { DependencyObject } from "./DependencyObject";
import { IUIElement } from "./IUIElement";
import { Guid } from "../DataTypes/Guid";
import { UIElementCollection } from "./UIElementCollection";
import { IAnimationsElement } from "./controls/IAnimationsElement";
import { Animations } from "./controls/Core";
import { UIElement } from "./Core";
import { IAnimatableUIElement } from "./IAnimatableElement";

export class AnimatableUIElement extends UIElement implements IAnimatableUIElement {  
    private _animations: Animations;
  
    get Animations(): Animations { return this._animations; }
   
    set Animations(value: Animations) { this._animations = value; }
  
    constructor() {
        super();
        //this._animations = new Animations();
    }

    LoadFromNode(node: any): void {

    }
    StartAnimation(): void { }
    StopAnimation(): void { }
}


// in xamarin.forms this is a  "Element"