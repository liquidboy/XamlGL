import { UIElement } from "../UIElement";

export class Scene extends UIElement {
    private _scene: BABYLON.Scene;
    get Scene(): BABYLON.Scene { return this._scene; }

    constructor() {
        super();
    }

    public Initialize(engine: BABYLON.Engine): void {
        this._scene = new BABYLON.Scene(engine);
        engine.runRenderLoop(() => {
            this._scene.render();
        });
    }

}