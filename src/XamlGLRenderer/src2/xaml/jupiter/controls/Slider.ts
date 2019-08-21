import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class Slider extends UIElement {
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
        this.Ctrl = new BABYLON.GUI.Slider(this.Name);  
        this.Ctrl.height = this.Height;
        this.Ctrl.width = this.Width;
        this.Ctrl.minimum = this.Min;
        this.Ctrl.maximum = this.Max;
        this.Ctrl.value = this.Value;
        
        if (this.HasValue(this.Color)) this.Ctrl.color = this.Color;
        if (this.HasValue(this.Background)) this.Ctrl.background = this.Background;
        if (this.HasValue(this.HorizontalAlignment)) this.Ctrl.horizontalAlignment = this.HorizontalAlignment;
        this.Ctrl.text = this.Value;

        (this.Parent as any).Ctrl.addControl(this.Ctrl);
        
        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);

        this.UpdatePropertyByNode(node, "Height", "Height");
        this.UpdatePropertyByNode(node, "Width", "Width");
        this.UpdatePropertyByNodeAndFunction(node, "Minimum", "Min", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "Maximum", "Max", parseFloat);
        this.UpdatePropertyByNode(node, "Value", "Value");
        this.UpdatePropertyByNode(node, "Color", "Color");
        this.UpdatePropertyByNode(node, "Background", "Background");
        this.UpdatePropertyByNodeAndFunction(node, "HorizontalAlignment", "HorizontalAlignment", eval);
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}