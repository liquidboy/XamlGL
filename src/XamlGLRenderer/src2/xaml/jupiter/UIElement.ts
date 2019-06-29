﻿import { DependencyObject } from "./DependencyObject";
import { IUIElement } from "./IUIElement";
import { Guid } from "./../DataTypes/Guid";
import { IRender } from "./IRender";
import { VisualTree } from "../../services/VisualTree";
import { Container } from "inversify";
import { DIContainer } from "../Core";
import { IScript } from "./IScript";
import { CustomScript } from "../behaviors/CustomScript";
import { Event } from "./controls/Event";
import { LinkedDictionary } from "../../libs/typescript-collections/src/lib";

export class UIElement extends DependencyObject implements IUIElement, IRender, IScript {
    Parent: IUIElement;

    //private _animations: Animations;
    private _parent: UIElement;
    private _ctrl: any;
    private _isVisible: boolean;
    private _isDirty: boolean = true;
    private _uniqueId: string;
    private _name: string;
    private _position: BABYLON.Vector3; // = new BABYLON.Vector3(0, 0, 0);
    private _code: string;
    private _hasScript: boolean = false;
    private _hasCode: boolean = false;
    private _childEvents: LinkedDictionary<string, Event>;
    private _childGuis: LinkedDictionary<string, UIElement>;

    //get Animations(): Animations { return this._animations; }
    //get Parent(): UIElement { return this._parent; }
    get Ctrl(): any { return this._ctrl; }
    get IsVisible(): boolean { return this._isVisible; }
    get IsDirty(): boolean { return this._isDirty; }
    get UniqueID(): string { return this._uniqueId; }
    get Name(): string { return this._name; }
    get Position(): BABYLON.Vector3 { return this._position; }
    get Code(): string { return this._code; }
    get HasScript(): boolean { return this._hasScript; }
    get HasCode(): boolean { return this._hasCode; }
    get ChildrenEvents(): LinkedDictionary<string, Event> { return this._childEvents; }
    get ChildrenGUIs(): LinkedDictionary<string, UIElement> { return this._childGuis; }
    get bjsCtrl(): any { return this._ctrl; }
    
    //set Animations(value: Animations) { this._animations = value; }
    //set Parent(value: UIElement) { this._parent = value; }
    set Ctrl(value: any) { this._ctrl = value; }
    set IsVisible(value: boolean) { this._isVisible = value; }
    set IsDirty(value: boolean) { this._isDirty = value; }
    set UniqueID(value: string) { this._uniqueId = value; }
    set Name(value: string) { this._name = value; this.VT.Add(value, this); }
    set Code(value: string) { this._code = value; }
    set HasScript(value: boolean) { this._hasScript = value; }
    set HasCode(value: boolean) { this._hasCode = value; }

    protected VT: VisualTree = DIContainer.get(VisualTree);
    protected DI: Container = DIContainer;

    constructor() {
        super();
        this._uniqueId = Guid.newGuid();
        this._childEvents = new LinkedDictionary<string, Event>();
        this._childGuis = new LinkedDictionary<string, UIElement>();
        //this._animations = new Animations();
    }

    TrySetParent(parent: IUIElement): boolean {
        if (parent == null) return false;
        this.Parent = parent;
        return true;
    }

    LoadFromNode(node: any): void {
        try { this._position = eval(`new BABYLON.${node.attributes["Position"].value};`); } catch (e) { }
    }

    // always call this after the parents initialize has run
    Initialize(): void {
        
    }

    PostInitialize(): void {
        if (this.HasScript || this.HasCode) {
            try {
                if (this.HasCode) {
                    function evalInContext(js, context) { return function () { return eval(js); }.call(context); }
                    let ctx: {} = this.Ctrl;
                    ctx["VisualTreeHelper"] = this.VT;
                    ctx["Container"] = this.DI;
                    evalInContext(this.Code, ctx);
                    //CustomScript.InstallWithThis.call(this.Ctrl, [this.VT, this.DI]);
                }
                else CustomScript.Install(this.VT, this.DI, this.Code);
                //var found = eval(this.VT.ParseScript(this.Code));
            } catch (e) {
                var found = e;
            }
        }
    }
}
