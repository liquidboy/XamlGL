import { UIElement } from "../../UIElement";
import { Scene, ParticleSystemShape, Mesh } from "../Core";
import { LinkedDictionary } from "../../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"
import { ISetValue } from "../ISetValue";

export class Label extends UIElement implements ISetValue{

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
    private _textBlock: BABYLON.GUI.TextBlock;

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

    set Text(value: string) { this._text = value; }
    set Foreground(value: string) { this._foreground = value; }
    set Background(value: string) { this._background = value; }
    set Thickness(value: number) { this._thickness = value; }
    set Alpha(value: number) { this._alpha = value; }
    set CornerRadius(value: number) { this._cornerRadius = value; }
    set Width(value: string | number) { this._width = value; }
    set Height(value: string | number) { this._height = value; }
    set MeshName(value: string) { this._meshName = value; }
    set LinkOffsetY(value: string | number) { this._linkOffsetY = value; }
    set Top(value: string | number) { this._top = value; }
    set VerticalAlignment(value: number) { this._verticalAlignment = value; }
    set ZIndex(value: number) { this._zIndex = value; }

    constructor() {
        super();
    }

    public Initialize(): void {

        this.CreateCtrl();

        this.RefreshCtrlProperty("Background");
        this.RefreshCtrlProperty("Height");
        this.RefreshCtrlProperty("Alpha");
        this.RefreshCtrlProperty("Width");
        this.RefreshCtrlProperty("CornerRadius");
        this.RefreshCtrlProperty("Thickness");
        this.RefreshCtrlProperty("LinkOffsetY");
        this.RefreshCtrlProperty("Top");
        if (this.VerticalAlignment !== undefined) this.Ctrl.verticalAlignment = this.VerticalAlignment;

        this.RefreshCtrlProperty("ZIndex");
        
        (this.Parent as any).Ctrl.addControl(this.Ctrl);

        if (this.MeshName !== undefined) {
            let mesh: Mesh = this.VT.Get(this.MeshName) as Mesh;
            this.Ctrl.linkWithMesh(mesh.Ctrl);
        }

        this.RefreshCtrlProperty("Text");
        this.RefreshCtrlProperty("Foreground");


        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);

        this.UpdatePropertyByNode(node, "Foreground", "Foreground");
        this.UpdatePropertyByNode(node, "Background", "Background");
        this.UpdatePropertyByNode(node, "Width", "Width");
        this.UpdatePropertyByNode(node, "Height", "Height");
        this.UpdatePropertyByNodeAndFunction(node, "Thickness", "Thickness", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "Alpha", "Alpha", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "CornerRadius", "CornerRadius", parseFloat);
        this.UpdatePropertyByNode(node, "LinkOffsetY", "LinkOffsetY");
        this.UpdatePropertyByNodeAndFunction(node, "LinkOffsetY", "LinkOffsetY", parseFloat);

        this.UpdatePropertyByNode(node, "Mesh", "Mesh");
        this.UpdatePropertyByNode(node, "Text", "Text");
        this.UpdatePropertyByNode(node, "Top", "Top");

        this.UpdatePropertyByNodeAndFunction(node, "VerticalAlignment", "VerticalAlignment", eval);
        this.UpdatePropertyByNodeAndFunction(node, "ZIndex", "ZIndex", parseFloat);
    }

    SetValue(propertyName: string, value: any): void {
        switch (propertyName) {
            case "Height":
            case "Width":
            case "Foreground":
            case "Background":
            case "Mesh":
            case "Text":
            case "Top": this.UpdatePropertyByValue(propertyName, value, null); break;
            case "Alpha":
            case "CornerRadius":
            case "LinkOffsetY":
            case "Thickness":
            case "ZIndex": this.UpdatePropertyByValue(propertyName, value, parseFloat); break;
            default: return;
        }
        this.RefreshCtrlProperty(propertyName);
    }

    RefreshCtrlProperty(propertyName: string): void {
        switch (propertyName) {
            case "Height": if (this.HasValue(this.Height)) this.Ctrl.height = this.Height; break;
            case "Width": if (this.HasValue(this.Width)) this.Ctrl.width = this.Width; break;
            case "Foreground": if (this.HasValue(this.Foreground)) this._textBlock.color = this.Foreground; break;
            case "Background": if (this.HasValue(this.Background)) this.Ctrl.background = this.Background; break;
            case "Text": if (this.HasValue(this.Text)) this._textBlock.text = this.Text; break;
            case "Top": if (this.HasValue(this.Top)) this.Ctrl.top = this.Top; break;
            case "Alpha": if (this.HasValue(this.Alpha)) this.Ctrl.alpha = this.Alpha; break;
            case "CornerRadius": if (this.HasValue(this.CornerRadius)) this.Ctrl.cornerRadius = this.CornerRadius; break;
            case "LinkOffsetY": if (this.HasValue(this.LinkOffsetY)) this.Ctrl.linkOffsetY = this.LinkOffsetY; break;
            case "Thickness": if (this.HasValue(this.Thickness)) this.Ctrl.thickness = this.Thickness; break;
            case "ZIndex": if (this.HasValue(this.ZIndex)) this.Ctrl.zIndex = this.ZIndex; break;
        }
    }

    ClearCtrl(): void {
        if (!this.HasValue(this.Ctrl)) return;
        
        if (!this.HasValue(this._textBlock)) {
            this._textBlock.dispose();
            this._textBlock = null;
        }

        this.bjsCtrl.dispose();
        this.Ctrl = null;
    }

    CreateCtrl(): void {
        this.ClearCtrl();
        this.Ctrl = new BABYLON.GUI.Rectangle(this.Name);

        this._textBlock = new BABYLON.GUI.TextBlock();
        this.Ctrl.addControl(this._textBlock);
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);            
            return true;
        }
        return false;
    }
}