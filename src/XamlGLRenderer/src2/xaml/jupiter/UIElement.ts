import { DependencyObject } from "./DependencyObject";
import { IUIElement } from "./IUIElement";
import { Guid } from "./../DataTypes/Guid";
import { UIElementCollection } from "./UIElementCollection";
import { IAnimationsElement } from "./IAnimationsElement";

export class UIElement extends DependencyObject implements IUIElement, IAnimationsElement {
    
    private _animations: UIElementCollection;
    private _isVisible: boolean;
    private _isDirty: boolean = true;
    private _uniqueId: string;
    private _name: string;

    get Animations(): UIElementCollection { return this._animations; }
    get IsVisible(): boolean { return this._isVisible; }
    get IsDirty(): boolean { return this._isDirty; }
    get UniqueID(): string { return this._uniqueId; }
    get Name(): string { return this._name; }

    set Animations(value: UIElementCollection) { this._animations = value; }
    set IsVisible(value: boolean) { this._isVisible = value; }
    set IsDirty(value: boolean) { this._isDirty = value; }
    set UniqueID(value: string) { this._uniqueId = value; }
    set Name(value: string) { this._name = value; }

    constructor() {
        super();
        this._uniqueId = Guid.newGuid();
        this._animations = new UIElementCollection();
    }

    LoadFromNode(node: any): void { }
}


// in xamarin.forms this is a  "Element"