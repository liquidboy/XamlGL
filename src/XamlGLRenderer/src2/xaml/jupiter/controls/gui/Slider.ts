import { UIElement } from "../../UIElement";
import { Scene, ParticleSystemShape } from "../Core";
import { LinkedDictionary } from "../../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"
import { ISetValue } from "../ISetValue";

export class Slider extends UIElement implements ISetValue {
   
    private _height: number | string;
    private _min: number;
    private _max: number;
    private _width: string | number;
    private _value: any;
    private _color: string;
    private _background: string;
    private _horizontalAlignment: number;
    
    get Height(): number | string { return this._height; }
    get Width(): number | string { return this._width; }
    get Min(): number { return this._min; }
    get Max(): number { return this._max; }
    get Value(): any { return this._value; }
    get Color(): string { return this._color; }
    get Background(): string { return this._background; }
    get HorizontalAlignment(): number { return this._horizontalAlignment; }

    set Height(value: number | string) { this._height = value; }
    set Width(value: number | string) { this._width = value; }
    set Min(value: number) { this._min = value; }
    set Max(value: number) { this._max = value; }
    set Value(value: any) { this._value = value; }
    set Color(value: string) { this._color = value; }
    set Background(value: string) { this._background = value; }
    set HorizontalAlignment(value: number) { this._horizontalAlignment = value; }

    constructor() {
        super();
    }

    public Initialize(): void {
        this.CreateCtrl();

        this.RefreshCtrlProperty("Height");
        this.RefreshCtrlProperty("Width");
        this.RefreshCtrlProperty("Minimum");
        this.RefreshCtrlProperty("Maximum");
        this.RefreshCtrlProperty("Value");

        this.RefreshCtrlProperty("Color");
        this.RefreshCtrlProperty("Background");
        this.RefreshCtrlProperty("HorizontalAlignment");
        
        this.Ctrl.text = this.Value;

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

        this.UpdatePropertyByNodeAndFunction(node, "Minimum", "Min", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "Minimum", "Min", eval);

        this.UpdatePropertyByNodeAndFunction(node, "Maximum", "Max", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "Maximum", "Max", eval);

        this.UpdatePropertyByNode(node, "Value", "Value");
        this.UpdatePropertyByNode(node, "Color", "Color");
        this.UpdatePropertyByNode(node, "Background", "Background");
        this.UpdatePropertyByNodeAndFunction(node, "HorizontalAlignment", "HorizontalAlignment", eval);
    }

    SetValue(propertyName: string, value: any): void {
        switch (propertyName) {
            case "Height":
            case "Width":
            case "Color":
            case "Background":
            case "Value": this.UpdatePropertyByValue(propertyName, value, null); break;
            case "HorizontalAlignment": this.UpdatePropertyByValue(propertyName, value, eval); break;
            case "Minimum":
                this.UpdatePropertyByValue("Min", value, parseFloat);
                this.UpdatePropertyByValue("Min", value, eval);
                break;
            case "Maximum":
                this.UpdatePropertyByValue("Max", value, parseFloat);
                this.UpdatePropertyByValue("Max", value, eval);
                break;
            default: return;
        }
        this.RefreshCtrlProperty(propertyName);
    }

    RefreshCtrlProperty(propertyName: string): void {
        switch (propertyName) {
            case "Height": if (this.HasValue(this.Height)) this.Ctrl.height = this.Height; break;
            case "Width": if (this.HasValue(this.Width)) this.Ctrl.width = this.Width; break;
            case "Minimum": if (this.HasValue(this.Min)) this.Ctrl.minimum = this.Min; break;
            case "Maximum": if (this.HasValue(this.Max)) this.Ctrl.maximum = this.Max; break;
            case "Value": if (this.HasValue(this.Value)) this.Ctrl.value = this.Value; break;
            case "Color": if (this.HasValue(this.Color)) this.Ctrl.color = this.Color; break;
            case "Background": if (this.HasValue(this.Background)) this.Ctrl.background = this.Background; break;
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
        this.Ctrl = new BABYLON.GUI.Slider(this.Name);  
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}