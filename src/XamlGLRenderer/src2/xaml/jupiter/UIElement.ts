﻿import { DependencyObject } from "./DependencyObject";
import { IUIElement } from "./IUIElement";
import { Guid } from "./../DataTypes/Guid";
import { UIElementCollection } from "./UIElementCollection";
import { IAnimationsElement } from "./controls/IAnimationsElement";
import { Animations, Scene } from "./controls/Core";
import { IRender } from "./IRender";

export class UIElement extends DependencyObject implements IUIElement, IRender {
    
    
    //private _animations: Animations;
    private _isVisible: boolean;
    private _isDirty: boolean = true;
    private _uniqueId: string;
    private _name: string;
    private _position: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 0);

    //get Animations(): Animations { return this._animations; }
    get IsVisible(): boolean { return this._isVisible; }
    get IsDirty(): boolean { return this._isDirty; }
    get UniqueID(): string { return this._uniqueId; }
    get Name(): string { return this._name; }
    get Position(): BABYLON.Vector3 { return this._position; }

    //set Animations(value: Animations) { this._animations = value; }
    set IsVisible(value: boolean) { this._isVisible = value; }
    set IsDirty(value: boolean) { this._isDirty = value; }
    set UniqueID(value: string) { this._uniqueId = value; }
    set Name(value: string) { this._name = value; }

    constructor() {
        super();
        this._uniqueId = Guid.newGuid();
        //this._animations = new Animations();
    }

    LoadFromNode(node: any): void {
        try { this._position = eval(`new BABYLON.${node.attributes["Position"].value};`); } catch (e) { }
    }

    Initialize(scene: Scene): void { }
}


// in xamarin.forms this is a  "Element"
