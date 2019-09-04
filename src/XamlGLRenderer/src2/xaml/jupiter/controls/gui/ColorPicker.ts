import { UIElement } from "../../UIElement";
import { Scene, ParticleSystemShape } from "../Core";
import { LinkedDictionary } from "../../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"
import { ISetValue } from "../ISetValue";

export class ColorPicker extends UIElement implements ISetValue {
    
    private _height: number | string;
    private _width: string | number;
    private _value: any;
    private _horizontalAlignment: number;
    
    get Height(): number | string { return this._height; }
    get Width(): number | string { return this._width; }
    get Value(): any { return this._value; }
    get HorizontalAlignment(): any { return this._horizontalAlignment; }

    set Height(value: number | string) { this._height = value; }
    set Width(value: number | string) { this._width = value; }
    set Value(value: any) { this._value = value; }
    set HorizontalAlignment(value: any) { this._horizontalAlignment = value; }

    constructor() {
        super();
    }

    public Initialize(): void {
        this.CreateCtrl();

        this.RefreshCtrlProperty("Height");
        this.RefreshCtrlProperty("Width");
        this.RefreshCtrlProperty("Value");
        this.RefreshCtrlProperty("HorizontalAlignment");
        
        (this.Parent as any).Ctrl.addControl(this.Ctrl);
        
        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);

        this.UpdatePropertyByNode(node, "Width", "Width");
        this.UpdatePropertyByNode(node, "Height", "Height");
        this.UpdatePropertyByNode(node, "Value", "Value");
        this.UpdatePropertyByNodeAndFunction(node, "HorizontalAlignment", "HorizontalAlignment", eval);
    }

    SetValue(propertyName: string, value: any): void {
        switch (propertyName) {
            case "Height":
            case "Width":
            case "Value": this.UpdatePropertyByValue(propertyName, value, null); break;
            case "HorizontalAlignment": this.UpdatePropertyByValue(propertyName, value, eval); break;
            default: return;
        }
        this.RefreshCtrlProperty(propertyName);
    }
    RefreshCtrlProperty(propertyName: string): void {
        switch (propertyName) {
            case "Height": if (this.HasValue(this.Height)) this.Ctrl.height = this.Height; break;
            case "Width": if (this.HasValue(this.Width)) this.Ctrl.width = this.Width; break;
            case "Value": if (this.HasValue(this.Value)) this.Ctrl.value = this.Value; break;
            case "HorizontalAlignment": if (this.HasValue(this.HorizontalAlignment)) this.Ctrl.horizontalAlignment = this.HorizontalAlignment; break;
        }
    }
    ClearCtrl(): void {
        if (!this.HasValue(this.Ctrl)) return;

        this.bjsCtrl.dispose();
        this.Ctrl = null;
    }
    CreateCtrl(): void {
        this.ClearCtrl();
        this.Ctrl = new BABYLON.GUI.ColorPicker(this.Name);  
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}