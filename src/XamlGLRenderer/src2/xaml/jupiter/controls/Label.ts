import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape, Mesh } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class Label extends UIElement {
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
    private _top: string | number;
    private _verticalAlignment: number;
    private _zIndex: number;

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
    get Top(): string | number { return this._top; }
    get VerticalAlignment(): number { return this._verticalAlignment; }
    get ZIndex(): number { return this._zIndex; }

    constructor() {
        super();
    }

    public Initialize(): void {
        
        this.Ctrl = new BABYLON.GUI.Rectangle(this.Name);
        this.Ctrl.background = this.Background;
        this.Ctrl.height = this.Height;
        this.Ctrl.alpha = this.Alpha;
        this.Ctrl.width = this.Width;
        this.Ctrl.cornerRadius = this.CornerRadius;
        this.Ctrl.thickness = this.Thickness;
        this.Ctrl.linkOffsetY = this.LinkOffsetY;
        if (this.Top !== undefined) this.Ctrl.top = this.Top;
        if (this.VerticalAlignment !== undefined) this.Ctrl.verticalAlignment = this.VerticalAlignment;
        if (this.ZIndex !== undefined) this.Ctrl.zIndex = this.ZIndex;
        
        (this.Parent as any).Ctrl.addControl(this.Ctrl);

        if (this.MeshName !== undefined) {
            let mesh: Mesh = this.VT.Get(this.MeshName) as Mesh;
            this.Ctrl.linkWithMesh(mesh.Ctrl);
        }

        let text1 = new BABYLON.GUI.TextBlock();
        text1.text = this.Text;
        text1.color = this.Foreground;
        this.Ctrl.addControl(text1);  

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
        try { this._top = node.attributes["Top"].value; } catch { }
        try { this._verticalAlignment = eval(node.attributes["VerticalAlignment"].value); } catch { }
        try { this._zIndex = parseFloat(node.attributes["ZIndex"].value); } catch { }
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);            
            return true;
        }
        return false;
    }
}