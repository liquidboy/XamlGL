﻿import { UIElement } from "../UIElement";
import { ParticleSystem, Mesh } from "./Core";

export class ParticleSystemShape extends UIElement {
    
    private _sceneName: string;
    private _meshName: string;
    private _nb: number;

    get SceneName(): string { return this._sceneName; }
    get MeshName(): string { return this._meshName; }
    get NB(): number { return this._nb; }

    set SceneName(value: string) { this._sceneName = value; }
    set MeshName(value: string) { this._meshName = value; }
    set NB(value: number) { this._nb = value; }

    constructor() {
        super();
    }

    public Initialize(): void {
        let ps: ParticleSystem = this.Parent as ParticleSystem;
        let mesh: Mesh = this.VT.Get(this.MeshName) as Mesh;

        if (this.ChildrenEvents.size() > 0) {
            let options: any = {};
            if (this.ChildrenEvents.containsKey("positionFunction")) {
                try { options["positionFunction"] = eval(this.ChildrenEvents.getValue("positionFunction").Code); } catch { }
            }
            if (this.ChildrenEvents.containsKey("vertexFunction")) {
                try { options["vertexFunction"] = eval(this.ChildrenEvents.getValue("vertexFunction").Code); } catch { }
            }
            ps.Ctrl.addShape(mesh.Ctrl, this.NB, options);
        } else if (this.HasScript) {
            let posFn: any = eval(this.Code);
            ps.Ctrl.addShape(mesh.Ctrl, this.NB, { positionFunction: posFn });
        } 

        let newMesh = ps.Ctrl.buildMesh();
        mesh.Ctrl.dispose();
    }

    public LoadFromNode(node: any): void {
        this.UpdatePropertyByNode(node, "Scene", "SceneName");
        this.UpdatePropertyByNode(node, "Mesh", "MeshName");
        this.UpdatePropertyByNodeAndFunction(node, "NB", "NB", parseInt);

        try {
            let parser: DOMParser = new DOMParser();
            let scriptFound: Document = parser.parseFromString(node.innerHTML, "text/html");
            this.Code = node.childNodes[1].wholeText;
            //this.Code = scriptFound.body.innerText;
            this.HasScript = true;
        } catch (e) { }
        super.LoadFromNode(node);
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            if (this.HasScript) {
                let ps: ParticleSystem = parent as ParticleSystem;
                ps.Children.setValue(this.Name, this);
            }
            return true;
        }
        return false;
    }
}