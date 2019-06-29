import { UIElement } from "../UIElement";
import { Scene, ParticleSystemShape } from "./Core";
import { LinkedDictionary } from "../../../libs/typescript-collections/src/lib";
import "babylonjs-gui"

export class Plane extends UIElement {
    private _size: number;
    private _meshName: string;
    private _sceneName: string;
    
    get Size(): number { return this._size; }
    get MeshName(): string { return this._meshName; }
    get SceneName(): string { return this._sceneName; }

    constructor() {
        super();
    }

    public Initialize(): void {
        if (this.SceneName !== undefined) {
            let scene = this.VT.FindByName(this.SceneName);
            this.Ctrl = BABYLON.Mesh.CreatePlane(this.Name, this.Size, scene.Ctrl);  
            this.Ctrl.Size = this.Size;
            this.Ctrl.position = this.Position;

            if (this.MeshName !== undefined) {
                let mesh = this.VT.FindByName(this.MeshName);
                this.Ctrl.parent = mesh.Ctrl;
            }
        }

        this.ChildrenGUIs.forEach((key:string, child: UIElement) => {
            child.Initialize();
        });

        this.PostInitialize();
    }

    public LoadFromNode(node: any): void {
        super.LoadFromNode(node);
        try { this._size = parseFloat(node.attributes["Size"].value); } catch { }
        try { this._meshName = node.attributes["Mesh"].value; } catch { }
        try { this._sceneName = node.attributes["Scene"].value; } catch { }
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            parent.ChildrenGUIs.setValue(this.Name, this);
            return true;
        }
        return false;
    }
}