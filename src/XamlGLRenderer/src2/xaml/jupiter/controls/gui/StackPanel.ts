import { UIElement } from "../../UIElement";
import { Scene, ParticleSystemShape } from "../Core";
import { LinkedDictionary } from "../../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"
import { ISetValue } from "../ISetValue";

export class StackPanel extends UIElement implements ISetValue {

    private _height: string | number;
    private _width: string | number;
    private _top: string | number;
    private _rotation: number;
    private _isVertical: boolean;
    private _fontSize: string;
    private _paddingRight: string | number;
    private _horizontalAlignment: number;
    private _verticalAlignment: number;
    
    get Rotation(): number { return this._rotation; }
    get Height(): string | number { return this._height; }
    get Width(): string | number { return this._width; }
    get IsVertical(): boolean { return this._isVertical; }
    get Top(): string | number { return this._top; }
    get PaddingRight(): string | number { return this._paddingRight; }
    get FontSize(): string  { return this._fontSize; }
    get HorizontalAlignment(): number { return this._horizontalAlignment; }
    get VerticalAlignment(): number { return this._verticalAlignment; }

    set Rotation(value: number) { this._rotation = value; }
    set Height(value: string | number) { this._height = value; }
    set Width(value: string | number) { this._width = value; }
    set IsVertical(value: boolean) { this._isVertical = value; }
    set Top(value: string | number) { this._top = value; }
    set PaddingRight(value: string | number) { this._paddingRight = value; }
    set FontSize(value: string) { this._fontSize = value; }
    set HorizontalAlignment(value: number) { this._horizontalAlignment = value; }
    set VerticalAlignment(value: number) { this._verticalAlignment = value; }

    constructor() {
        super();
    }

    public Initialize(): void {
        this.CreateCtrl();

        this.RefreshCtrlProperty("Height");

        if (this.Width !== undefined) this.Ctrl.width = this.Width;
        else if (this.Parent instanceof StackPanel && this.Parent.Width !== undefined) this.Ctrl.width = this.Parent.Width;

        this.RefreshCtrlProperty("Top");
        this.RefreshCtrlProperty("Rotation");
        this.RefreshCtrlProperty("HorizontalAlignment");
        this.RefreshCtrlProperty("VerticalAlignment");
        this.RefreshCtrlProperty("FontSize");
        this.RefreshCtrlProperty("PaddingRight");
        this.RefreshCtrlProperty("IsVertical");

        this.Parent.Ctrl.addControl(this.Ctrl);

        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);

        this.UpdatePropertyByNode(node, "Height", "Height");
        this.UpdatePropertyByNode(node, "Width", "Width");
        this.UpdatePropertyByNode(node, "Top", "Top");
        this.UpdatePropertyByNodeAndFunction(node, "Rotation", "Rotation", parseFloat);
        this.UpdatePropertyByNodeAndFunction(node, "HorizontalAlignment", "HorizontalAlignment", eval);
        this.UpdatePropertyByNodeAndFunction(node, "VerticalAlignment", "VerticalAlignment", eval);
        this.UpdatePropertyByNode(node, "FontSize", "FontSize");
        this.UpdatePropertyByNode(node, "PaddingRight", "PaddingRight");
        this.UpdatePropertyByNodeAndFunction(node, "IsVertical", "IsVertical", this.ConvertToBoolean);
    }

    SetValue(propertyName: string, value: any): void {
        switch (propertyName) {
            case "Height":
            case "Width":
            case "Top":
            case "PaddingRight":
            case "FontSize": this.UpdatePropertyByValue(propertyName, value, null); break;
            case "Rotation": this.UpdatePropertyByValue(propertyName, value, parseFloat); break;
            case "HorizontalAlignment": 
            case "VerticalAlignment": this.UpdatePropertyByValue(propertyName, value, eval); break;
            case "IsVertical": this.UpdatePropertyByValue(propertyName, value, this.ConvertToBoolean); break;
            default: return;
        }
        this.RefreshCtrlProperty(propertyName);
    }

    RefreshCtrlProperty(propertyName: string): void {
        switch (propertyName) {
            case "Height": if (this.HasValue(this.Height)) this.Ctrl.height = this.Height; break;
            case "Width": if (this.HasValue(this.Width)) this.Ctrl.width = this.Width; break;
            case "Top": if (this.HasValue(this.Top)) this.Ctrl.color = this.Top; break;
            case "PaddingRight": if (this.HasValue(this.PaddingRight)) this.Ctrl.paddingRight = this.PaddingRight; break;
            case "FontSize": if (this.HasValue(this.FontSize)) this.Ctrl.fontSize = this.FontSize; break;
            case "Rotation": if (this.HasValue(this.Rotation)) this.Ctrl.rotation = this.Rotation; break;
            case "HorizontalAlignment": if (this.HasValue(this.HorizontalAlignment)) this.Ctrl.horizontalAlignment = this.HorizontalAlignment; break;
            case "VerticalAlignment": if (this.HasValue(this.VerticalAlignment)) this.Ctrl.verticalAlignment = this.VerticalAlignment; break;
            case "IsVertical": if (this.HasValue(this.IsVertical)) this.Ctrl.isVertical = this.IsVertical; break;
        }
    }

    ClearCtrl(): void {
        if (!this.HasValue(this.Ctrl)) return;

        this.bjsCtrl.dispose();
        this.Ctrl = null;
    }

    CreateCtrl(): void {
        this.ClearCtrl();
        this.Ctrl =new BABYLON.GUI.StackPanel(this.Name);
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}