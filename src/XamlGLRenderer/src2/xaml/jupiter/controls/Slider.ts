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
    private _horizontalAlignment: number;
    
    get Height(): number | string { return this._height; }
    get Width(): number | string { return this._width; }
    get Min(): number { return this._min; }
    get Max(): number { return this._max; }
    get Value(): any { return this._value; }
    get Color(): string { return this._color; }
    get HorizontalAlignment(): number { return this._horizontalAlignment; }

    constructor() {
        super();
    }

    public Initialize(): void {
        this.Ctrl = new BABYLON.GUI.Slider(this.Name);  
        this.Ctrl.height = this.Height;
        this.Ctrl.width = this.Width;
        this.Ctrl.min = this.Min;
        this.Ctrl.max = this.Max;
        this.Ctrl.value = this.Value;
        
        if (this.Color !== undefined) this.Ctrl.color = this.Color;
        if (this.HorizontalAlignment !== undefined) this.Ctrl.horizontalAlignment = this.HorizontalAlignment;
        this.Ctrl.text = this.Value;

        (this.Parent as any).Ctrl.addControl(this.Ctrl);
        
        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._height = node.attributes["Height"].value; } catch { }
        try { this._width = node.attributes["Width"].value; } catch { }
        try { this._min = parseFloat(node.attributes["Minimum"].value); } catch { }
        try { this._max = parseFloat(node.attributes["Maximum"].value); } catch { }
        try { this._value = node.attributes["Value"].value; } catch { }
        try { this._color = node.attributes["Color"].value; } catch { }
        try { this._horizontalAlignment = eval(node.attributes["HorizontalAlignment"].value); } catch { }
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}