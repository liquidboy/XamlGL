import { UIElement } from "../../UIElement";
import { Scene, ParticleSystemShape } from "./../Core";
import { LinkedDictionary } from "../../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"
import { ISetValue } from "../ISetValue";

export class CheckBox extends UIElement implements ISetValue {

    private _width: number | string;
    private _height: number | string;
    private _color: string;
    private _background: string;
    private _fontSize: number;
    private _content: string;
    private _isChecked: boolean;
    private _header: any;
    private _headerSize: number | string;
    private _headerHeight: number | string;
    private _horizontalAlignment: number;
    
    get Width(): number | string { return this._width; }
    get Height(): number | string { return this._height; }
    get Color(): string { return this._color; }
    get Background(): string { return this._background; }
    get FontSize(): number { return this._fontSize; }
    get Content(): string { return this._content; }
    get IsChecked(): boolean { return this._isChecked; }
    get HeaderSize(): number | string { return this._headerSize; }
    get HeaderHeight(): number | string { return this._headerHeight; }
    get HorizontalAlignment(): number { return this._horizontalAlignment; }

    set Width(value: number | string) { this._width = value; }
    set Height(value: number | string) { this._height = value; }
    set Color(value: string) { this._color = value; }
    set Background(value: string) { this._background = value; }
    set FontSize(value: number) { this._fontSize = value; }
    set Content(value: string) { this._content = value; }
    set IsChecked(value: boolean) { this._isChecked = value; }
    set HeaderSize(value: number | string) { this._headerSize = value; }
    set HeaderHeight(value: number | string) { this._headerHeight = value; }
    set HorizontalAlignment(value: number) { this._horizontalAlignment = value; }

    constructor() {
        super();
    }

    public Initialize(): void {
        this.CreateCtrl();
        
        this.RefreshCtrlProperty("Width");
        this.RefreshCtrlProperty("Height");
        this.RefreshCtrlProperty("Color");
        this.RefreshCtrlProperty("IsChecked");
        this.RefreshCtrlProperty("Background");

        this.CreateCtrlRelated();

        (this.Parent as any).Ctrl.addControl(this._header);
        
        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);

        this.UpdatePropertyByNode(node, "Width", "Width");
        this.UpdatePropertyByNode(node, "Height", "Height");
        this.UpdatePropertyByNode(node, "Color", "Color");
        this.UpdatePropertyByNode(node, "Background", "Background");
        this.UpdatePropertyByNodeAndFunction(node, "FontSize", "FontSize", parseFloat);
        this.UpdatePropertyByNode(node, "Content", "Content");
        this.UpdatePropertyByNode(node, "HeaderSize", "HeaderSize");
        this.UpdatePropertyByNodeAndFunction(node, "IsChecked", "IsChecked", this.ConvertToBoolean);
        this.UpdatePropertyByNode(node, "HeaderHeight", "HeaderHeight");
        this.UpdatePropertyByNodeAndFunction(node, "HorizontalAlignment", "HorizontalAlignment", eval);
    }

    SetValue(propertyName: string, value: any): void {
        switch (propertyName) {
            case "Height":
            case "Width":
            case "Color":
            case "Content":
            case "HeaderHeight":
            case "HeaderSize":
            case "Background": this.UpdatePropertyByValue(propertyName, value, null); break;
            case "IsChecked": this.UpdatePropertyByValue(propertyName, value, this.ConvertToBoolean); break;
            case "FontSize": this.UpdatePropertyByValue(propertyName, value, parseFloat); break;
            case "HorizontalAlignment": this.UpdatePropertyByValue(propertyName, value, eval); break;
            default: return;
        }
        this.RefreshCtrlProperty(propertyName);
    }

    RefreshCtrlProperty(propertyName: string): void {
        switch (propertyName) {
            case "Height": if (this.HasValue(this.Height)) this.Ctrl.height = this.Height; break;
            case "Width": if (this.HasValue(this.Width)) this.Ctrl.width = this.Width; break;
            case "Color":
                if (this.HasValue(this.Color)) {
                    this.Ctrl.color = this.Color;
                    if (this.HasValue(this._header)) {
                        this._header.color = this.Color;
                    }
                }
                break;
            case "Background": if (this.HasValue(this.Background)) this.Ctrl.background = this.Background; break;
            case "IsChecked": if (this.HasValue(this.IsChecked) && this.HasValue(this.IsChecked)) this.Ctrl.isChecked = this.IsChecked; break;
            case "HeaderSize": if (this.HasValue(this.HeaderSize)) this._header.size = this.HeaderSize; break;
            case "HeaderHeight": if (this.HasValue(this.HeaderHeight)) this._header.height = this.HeaderHeight; break;
            case "FontSize": if (this.HasValue(this.FontSize)) this._header.children[1].fontSize = this.FontSize; break;
            case "HorizontalAlignment": if (this.HasValue(this.HorizontalAlignment)) this._header.horizontalAlignment = this.HorizontalAlignment; break;
        }
    }

    ClearCtrl(): void {
        if (!this.HasValue(this.Ctrl)) return;

        this.bjsCtrl.dispose();
        this.Ctrl = null;

        this._header.dispose();
        this._header = null;
    }

    CreateCtrl(): void {
        this.ClearCtrl();
        this.Ctrl = new BABYLON.GUI.Checkbox();
    }

    CreateCtrlRelated(): void {
        
        this._header = BABYLON.GUI.Control.AddHeader(this.Ctrl, this.Content, this.HeaderSize, { isHorizontal: true, controlFirst: true });

        this.RefreshCtrlProperty("Color");
        this.RefreshCtrlProperty("HeaderHeight");
        this.RefreshCtrlProperty("HorizontalAlignment");
        this.RefreshCtrlProperty("FontSize");

        this._header.children[1].onPointerDownObservable.add(() => {
            this.Ctrl.isChecked = !this.Ctrl.isChecked;
        });
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}