import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class ColorPicker extends UIElement {
    private _height: number | string;
    private _width: string | number;
    private _value: any;
    private _horizontalAlignment: number;
    
    get Height(): number | string { return this._height; }
    get Width(): number | string { return this._width; }
    get Value(): any { return this._value; }
    get HorizontalAlignment(): any { return this._horizontalAlignment; }
    
    constructor() {
        super();
    }

    public Initialize(): void {
        this.Ctrl = new BABYLON.GUI.ColorPicker(this.Name);  
        this.Ctrl.height = this.Height;
        this.Ctrl.width = this.Width;
        if (this.Value !== undefined) this.Ctrl.value = this.Value;
        this.Ctrl.horizontalAlignment = this.HorizontalAlignment;
        
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
        try { this._value = node.attributes["Value"].value; } catch { }
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