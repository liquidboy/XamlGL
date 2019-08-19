import { DependencyObject } from "./DependencyObject";
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
    Parent: UIElement;

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
    set Code(value: string) { this._code = value; }
    set HasScript(value: boolean) { this._hasScript = value; }
    set HasCode(value: boolean) { this._hasCode = value; }
    set Name(value: string) { this._name = value; this.VT.Add(value, this); }
    set Position(value: BABYLON.Vector3) { this._position = value; }

    protected VT: VisualTree = DIContainer.get(VisualTree);
    protected DI: Container = DIContainer;

    constructor() {
        super();
        this._uniqueId = Guid.newGuid();
        this._childEvents = new LinkedDictionary<string, Event>();
        this._childGuis = new LinkedDictionary<string, UIElement>();
        //this._animations = new Animations();
    }

    TrySetParent(parent: UIElement): boolean {
        if (parent == null) return false;
        this.Parent = parent;
        return true;
    }

    LoadFromNode(node: any): void {
        try { this._position = eval(`new BABYLON.${node.attributes["Position"].value};`); } catch (e) { }
        try { this._isVisible = node.attributes["IsVisible"].value.toLowerCase() === 'true'; } catch (e) { }
    }

    // always call this after the parents initialize has run
    Initialize(): void {
        
    }

    PostInitialize(): void {
        if (this.HasScript || this.HasCode) {
            try {
                if (this.HasCode) {
                    function evalInContext(js, context) { return function () { return eval(js); }.call(context); }
                    let ctx: {} = this;
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

    private UpdateProperty = (property: string, value: any) : any => { this[property] = value; }

    protected HasValue = (property: any): boolean => { return (property !== null && property !== undefined) ? true : false; }

    protected CleanBabylonColor3Attribute = (color3: string): any => { return (color3.includes("Color3.")) ? eval(`BABYLON.${color3};`) : eval(`new BABYLON.${color3};`); }

    protected ConvertColor3ToColor4 = (color: BABYLON.Color3): BABYLON.Color4 => { return new BABYLON.Color4(color.r, color.g, color.b, 1); }

    protected ConvertToBoolean = (value: string): boolean => { return value.toLowerCase() === 'true' ? true : false; }

    protected SetValueFromNode: Function = (node: any, attributeName: string, propertyName: string): void => {
        if (node.hasAttribute(attributeName)) this.SetValue(node.attributes[attributeName].value, propertyName, null);
    }

    protected SetFnValueFromNode: Function = (node: any, attributeName: string, propertyName: string, fn: Function): void => {
        if (node.hasAttribute(attributeName)) this.SetValue(node.attributes[attributeName].value, propertyName, fn);
    }

    public SetValue: Function = (value: any, propertyName: string, valueConverterFunction: Function): void => {
        if (valueConverterFunction === null || valueConverterFunction === undefined) this.UpdateProperty(propertyName, value);
        else this.UpdateProperty(propertyName, valueConverterFunction(value));
    }
}
