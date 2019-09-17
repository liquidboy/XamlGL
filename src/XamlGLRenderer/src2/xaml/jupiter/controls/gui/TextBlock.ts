import { UIElement } from "../../UIElement";
import { Scene, ParticleSystemShape } from "../Core";
import { LinkedDictionary } from "../../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"
import { ISetValue } from "../ISetValue";

export class TextBlock extends UIElement implements ISetValue {

    private _height: number | string;
    private _width: number | string;
    private _fontSize: number;
    private _content: string;
    private _color: string;
    private _textHorizontalAlignment: number;
    
    get Height(): number | string { return this._height; }
    get Width(): number | string { return this._height; }
    get FontSize(): number  { return this._fontSize; }
    get Content(): string { return this._content; }
    get Color(): string { return this._color; }
    get TextHorizontalAlignment(): number { return this._textHorizontalAlignment; }

    set Height(value: number | string) { this._height = value; }
    set Width(value: number | string) { this._height = value; }
    set FontSize(value: number) { this._fontSize = value; }
    set Content(value: string) { this._content = value; }
    set Color(value: string) { this._color = value; }
    set TextHorizontalAlignment(value: number) { this._textHorizontalAlignment = value; }

    constructor() {
        super();
    }

    public Initialize(): void {
        this.CreateCtrl();

        this.RefreshCtrlProperty("Width");
        this.RefreshCtrlProperty("Height");
        this.RefreshCtrlProperty("Color");
        this.RefreshCtrlProperty("FontSize");
        this.RefreshCtrlProperty("TextHorizontalAlignment");
        this.RefreshCtrlProperty("Content");

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
        this.UpdatePropertyByNodeAndFunction(node, "FontSize", "FontSize", parseFloat);
        this.UpdatePropertyByNode(node, "Content", "Content");
        this.UpdatePropertyByNode(node, "Color", "Color");
        this.UpdatePropertyByNodeAndFunction(node, "TextHorizontalAlignment", "TextHorizontalAlignment", eval);
    }

    SetValue(propertyName: string, value: any): void {
        switch (propertyName) {
            case "Height":
            case "Width":
            case "Content":
            case "Color": this.UpdatePropertyByValue(propertyName, value, null); break;
            case "FontSize": this.UpdatePropertyByValue(propertyName, value, parseFloat); break;
            case "TextHorizontalAlignment": this.UpdatePropertyByValue(propertyName, value, eval); break;
            default: return;
        }
        this.RefreshCtrlProperty(propertyName);
    }

    RefreshCtrlProperty(propertyName: string): void {
        switch (propertyName) {
            case "Height": if (this.HasValue(this.Height)) this.Ctrl.height = this.Height; break;
            case "Width": if (this.HasValue(this.Width)) this.Ctrl.width = this.Width; break;
            case "Color": if (this.HasValue(this.Color)) this.Ctrl.color = this.Color; break;
            case "Content": if (this.HasValue(this.Content)) this.Ctrl.text = this.Content; break;
            case "FontSize": if (this.HasValue(this.FontSize)) this.Ctrl.fontSize = this.FontSize; break;
            case "TextHorizontalAlignment": if (this.HasValue(this.TextHorizontalAlignment)) this.Ctrl.textHorizontalAlignment = this.TextHorizontalAlignment; break;
        }
    }

    ClearCtrl(): void {
        if (!this.HasValue(this.Ctrl)) return;

        this.bjsCtrl.dispose();
        this.Ctrl = null;
    }

    CreateCtrl(): void {
        this.ClearCtrl();
        this.Ctrl = new BABYLON.GUI.TextBlock(this.Name);  
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}