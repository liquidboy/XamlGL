import { UIElement } from "../../UIElement";
import { Scene, ParticleSystemShape } from "./../Core";
import { LinkedDictionary } from "../../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"
import { ISetValue } from "../ISetValue";

export class RadioButton extends UIElement implements ISetValue {

    private _width: number | string;
    private _height: number | string;
    private _color: string;
    private _background: string;
    private _fontSize: number;
    private _content: string;
    private _header: any;
    private _headerSize: number | string;
    private _headerHeight: number | string;
    
    get Width(): number | string { return this._width; };
    get Height(): number | string { return this._height; };
    get Color(): string { return this._color; };
    get Background(): string { return this._background; };
    get FontSize(): number { return this._fontSize; };
    get Content(): string { return this._content; };
    get HeaderSize(): number | string { return this._headerSize; };
    get HeaderHeight(): number | string { return this._headerHeight; };

    set Width(value: number | string) { this._width = value; };
    set Height(value: number | string) { this._height = value; };
    set Color(value: string) { this._color = value; };
    set Background(value: string) { this._background = value; };
    set FontSize(value: number) { this._fontSize = value; };
    set Content(value: string) { this._content = value; };
    set HeaderSize(value: number | string) { this._headerSize = value; };
    set HeaderHeight(value: number | string) { this._headerHeight = value; };

    constructor() {
        super();
    }

    public Initialize(): void {
        this.CreateCtrl();
        this.CreateCtrlRelated();
        
        (this.Parent as any).Ctrl.addControl(this._header);
        
        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._height = node.attributes["Height"].value; } catch { }
        try { this._width = node.attributes["Width"].value; } catch { }
        try { this._color = node.attributes["Color"].value; } catch { }
        try { this._background = node.attributes["Background"].value; } catch { }
        try { this._fontSize = parseFloat(node.attributes["FontSize"].value); } catch { }
        try { this._content = node.attributes["Content"].value; } catch { }
        try { this._headerSize = node.attributes["HeaderSize"].value; } catch { }
        try { this._headerHeight = node.attributes["HeaderHeight"].value; } catch { }
    }

    SetValue(propertyName: string, value: any): void {
        switch (propertyName) {
            case "Height":
            case "Width":
            case "Color":
            case "Background":
            case "HeaderSize":
            case "HeaderHeight":
            case "Content": this.UpdatePropertyByValue(propertyName, value, null); break;
            case "FontSize": this.UpdatePropertyByValue(propertyName, value, parseFloat); break;
            default: return;
        }
        this.RefreshCtrlProperty(propertyName);
    }
    RefreshCtrlProperty(propertyName: string): void {
        switch (propertyName) {
            case "Height": if (this.HasValue(this.Height)) this.Ctrl.height = this.Height; break;
            case "Width": if (this.HasValue(this.Width)) this.Ctrl.width = this.Width; break;
            case "Color": if (this.HasValue(this.Color)) this.Ctrl.color = this.Color; break;
            case "Background": if (this.HasValue(this.Background)) this.Ctrl.background = this.Background; break;
            case "HeaderHeight": if (this.HasValue(this.HeaderHeight) && this.HasValue(this._header)) this._header.height = this.HeaderHeight; break;
            case "FontSize": if (this.HasValue(this.FontSize) && this.HasValue(this._header)) this._header.children[1].fontSize = this.FontSize; break;
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
        this.Ctrl = new BABYLON.GUI.RadioButton();

        this.RefreshCtrlProperty("Height");
        this.RefreshCtrlProperty("Width");
        this.RefreshCtrlProperty("Color");
        this.RefreshCtrlProperty("Background");
    }
    CreateCtrlRelated(): void {
        this._header = BABYLON.GUI.Control.AddHeader(this.Ctrl, this.Content, this.HeaderSize, { isHorizontal: true, controlFirst: true });

        this.RefreshCtrlProperty("HeaderHeight");
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