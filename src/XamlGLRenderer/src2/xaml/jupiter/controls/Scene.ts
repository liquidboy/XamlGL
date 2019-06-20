import { UIElement } from "../UIElement";
import { Camera, Light } from "./Core";
import { FrameworkElement } from "../FrameworkElement";

export class Scene extends UIElement {
    private _scene: BABYLON.Scene;
    get Scene(): BABYLON.Scene { return this._scene; }

    private _cameraName: string;
    get CameraName(): string { return this._cameraName; }

    private _lightName: string;
    get LightName(): string { return this._lightName; }

    private _camera: Camera;
    private _light: Light;

    constructor() {
        super();
    }

    public Initialize(engine: BABYLON.Engine, canvas: any, camera: UIElement, light: UIElement): void {
        this._scene = new BABYLON.Scene(engine);
        this._camera = camera as Camera;
        this._light = light as Light;

        engine.runRenderLoop(() => {
            this._scene.render();
        });
    }

    public LoadFromNode(node: any): void {
        try {
            this._cameraName = node.attributes["Camera"].value;
            this._lightName = node.attributes["Light"].value;
        }
        catch { }
    }

}