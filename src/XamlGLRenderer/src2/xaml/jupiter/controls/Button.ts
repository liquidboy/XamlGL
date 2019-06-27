import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class Button extends UIElement {
    private _ctrl: BABYLON.GUI.Button;
    private _children: LinkedDictionary<string, UIElement>;
    private _content: string;
    private _width: any;
    private _height: any;
    private _cornerRadius: number;
    private _color: string;
    private _background: string;

    get Ctrl(): BABYLON.GUI.Button { return this._ctrl; }
    get Children(): LinkedDictionary<string, UIElement> { return this._children; }
    get Content(): string { return this._content; }
    get Color(): string { return this._color; }
    get Background(): string { return this._background; }
    get CornerRadius(): number { return this._cornerRadius; }
    get Width(): any { return this._width ; }
    get Height(): any { return this._height; }

    constructor() {
        super();
        this._children = new LinkedDictionary();
    }

    public Initialize(): void {
        this._ctrl = BABYLON.GUI.Button.CreateSimpleButton(this.Name, this.Content);
        this._ctrl.width = this.Width;
        this._ctrl.height = this.Height;
        this._ctrl.color = this.Color;
        this._ctrl.cornerRadius = this.CornerRadius;
        this._ctrl.background = this.Background;
        (this.Parent as any).Ctrl.addControl(this._ctrl);

        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        if (this.ChildrenEvents.size() > 0) {
            let options: any = {};
            if (this.ChildrenEvents.containsKey("positionFunction")) {
                try { options["positionFunction"] = eval(this.ChildrenEvents.getValue("positionFunction").Code); } catch { }
            }
            if (this.ChildrenEvents.containsKey("vertexFunction")) {
                try { options["vertexFunction"] = eval(this.ChildrenEvents.getValue("vertexFunction").Code); } catch { }
            }
            ps.ParticleSystem.addShape(mesh.Mesh, this.NB, options);
        } else if (this.HasScript) {
            let posFn: any = eval(this.Code);
            ps.ParticleSystem.addShape(mesh.Mesh, this.NB, { positionFunction: posFn });
        } 


        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._content = node.attributes["Content"].value; } catch { }
        try { this._color = node.attributes["Color"].value; } catch { }
        try { this._background = node.attributes["Background"].value; } catch { }
        try { this._width = node.attributes["Width"].value; } catch { }
        try { this._height = node.attributes["Height"].value; } catch { }
        try { this._cornerRadius = node.attributes["CornerRadius"].value; } catch { }
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);            
            return true;
        }
        return false;
    }
}