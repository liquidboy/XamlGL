import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape, Mesh } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class Label extends UIElement {
    private _ctrl: BABYLON.GUI.Rectangle;
    private _width: string | number;
    private _height: string | number;
    private _thickness: number;
    private _linkOffsetY: string | number;
    private _alpha: number;
    private _cornerRadius: number;
    private _text: string;
    private _foreground: string;
    private _background: string;
    private _meshName: string;

    get Ctrl(): BABYLON.GUI.Rectangle { return this._ctrl; }
    get Text(): string { return this._text; }
    get Foreground(): string { return this._foreground; }
    get Background(): string { return this._background; }
    get Thickness(): number { return this._thickness; }
    get Alpha(): number { return this._alpha; }
    get CornerRadius(): number { return this._cornerRadius; }
    get Width(): string | number { return this._width ; }
    get Height(): string | number { return this._height; }
    get MeshName(): string { return this._meshName; }
    get LinkOffsetY(): string | number { return this._linkOffsetY; }

    constructor() {
        super();
    }

    public Initialize(): void {
        let mesh: Mesh = this.VT.Get(this.MeshName) as Mesh;

        this._ctrl = new BABYLON.GUI.Rectangle(this.Name);
        this._ctrl.background = this.Background;
        this._ctrl.height = this.Height;
        this._ctrl.alpha = this.Alpha;
        this._ctrl.width = this.Width;
        this._ctrl.cornerRadius = this.CornerRadius;
        this._ctrl.thickness = this.Thickness;
        this._ctrl.linkOffsetY = this.LinkOffsetY;
        
        (this.Parent as any).Texture.addControl(this._ctrl);

        this._ctrl.linkWithMesh(mesh.Mesh);

        let text1 = new BABYLON.GUI.TextBlock();
        text1.text = this.Text;
        text1.color = this.Foreground;
        this._ctrl.addControl(text1);  

        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._foreground = node.attributes["Foreground"].value; } catch { }
        try { this._background = node.attributes["Background"].value; } catch { }
        try { this._width = node.attributes["Width"].value; } catch { }
        //try { this._width = parseFloat(node.attributes["Width"].value); } catch { }
        try { this._height = node.attributes["Height"].value; } catch { }
        //try { this._height = parseFloat(node.attributes["Height"].value); } catch { }
        try { this._thickness = parseFloat(node.attributes["Thickness"].value); } catch { }
        try { this._alpha = parseFloat(node.attributes["Alpha"].value); } catch { }
        try { this._cornerRadius = parseFloat(node.attributes["CornerRadius"].value); } catch { }
        try { this._linkOffsetY = node.attributes["LinkOffsetY"].value; } catch { }
        try { this._linkOffsetY = parseFloat(node.attributes["LinkOffsetY"].value); } catch { }
        try { this._meshName = node.attributes["Mesh"].value; } catch { }
        try { this._text = node.attributes["Text"].value; } catch { }
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);            
            return true;
        }
        return false;
    }
}