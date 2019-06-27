import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class StackPanel extends UIElement {
    private _ctrl: BABYLON.GUI.StackPanel;
    private _children: LinkedDictionary<string, UIElement>;
    
    private _width: number;
    private _rotation: number;
    private _horizontalAlignment: number;
    
    get Ctrl(): BABYLON.GUI.StackPanel { return this._ctrl; }
    get Children(): LinkedDictionary<string, UIElement> { return this._children; }
    get Rotation(): number { return this._rotation; }
    get Width(): number { return this._width ; }
    get HorizontalAlignment(): number { return this._horizontalAlignment; }

    constructor() {
        super();
        this._children = new LinkedDictionary();
    }

    public Initialize(): void {
        this._ctrl = new BABYLON.GUI.StackPanel();  
        this._ctrl.width = this.Width;
        this._ctrl.rotation = this.Rotation;
        this._ctrl.horizontalAlignment = this.HorizontalAlignment;
        (this.Parent as any).Texture.addControl(this._ctrl);

        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._width = parseFloat(node.attributes["Width"].value); } catch { }
        try { this._rotation = parseFloat(node.attributes["Rotation"].value); } catch { }
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