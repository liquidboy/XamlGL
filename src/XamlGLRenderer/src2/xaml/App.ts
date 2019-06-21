import { XamlMarkup } from "./reader/XamlMarkup";
import { XamlParser } from "./reader/XamlParser";
import { IFrameworkElement, FrameworkElement, UIElement } from "./jupiter/Core";
import { Panel, Scene, Camera, Material } from "./jupiter/controls/Core";
import { SceneMouseWheelZoom } from "./extensions/SceneMouseWheelZoom";

export class App {
    private _canvas: any;
    private _engine: BABYLON.Engine;
    //private scene: BABYLON.Scene;
    //private camera: BABYLON.FreeCamera;
    private light: BABYLON.Light;
    private xamlMarkup: XamlMarkup;
    private _rootElement: IFrameworkElement;

    constructor() {

    }

    public Start(xaml: XamlMarkup, canvasElement: string): void {
        this.xamlMarkup = xaml;
        this._canvas = document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);

        // Listen for browser/canvas resize events
        window.addEventListener("resize", () => {
            this._engine.resize();
        });

        this.BuildVisualTree();
        //this.CreateScene();
        //this.Run();
        this.RenderScene();
    }

    private BuildVisualTree(): void {
        this._rootElement = XamlParser.XamlMarkupToUIElement(this.xamlMarkup);
    }



    private RenderScene(): void {
        let vt: Panel = this._rootElement as Panel;
        vt.Children.forEach((k: string, v: UIElement) => {
            if (v instanceof Scene) {
                let s: Scene = v as Scene;
                s.Initialize(this._engine, this._canvas, vt.Children.getValue(s.CameraName), vt.Children.getValue(s.LightName));
                SceneMouseWheelZoom.Install(s);
            } else if (v instanceof Camera) {
                let c: Camera = v as Camera;
                c.Initialize(vt.Children.getValue(c.SceneName) as Scene, this._canvas);

            } else {
                let o: any = v;
                if (o.Initialize != null) o.Initialize(vt.Children.getValue(o.SceneName) as Scene);
                if (o.InitializeWithMaterial != null) o.InitializeWithMaterial(vt.Children.getValue(o.SceneName) as Scene,
                    vt.Children.getValue(o.MaterialName) as Material);
            }
        });
    }

    //private CreateScene(): void {

    //    // We need a scene to create all our geometry and babylonjs items in
    //    // this.scene = new BABYLON.Scene(this._engine);

    //    // Create a camera, and set its position to slightly behind our meshes
    //    this.camera = new BABYLON.FreeCamera('freeCamera', new BABYLON.Vector3(0, 5, -10), this.scene);

    //    // Make our camera look at the middle of the scene, where we have placed our items
    //    this.camera.setTarget(BABYLON.Vector3.Zero());

    //    // Attach the camera to the canvas, this allows us to give input to the camera
    //    this.camera.attachControl(this._canvas, true);

    //    // Create lightning in our scene
    //    this.light = new BABYLON.HemisphericLight('skyLight', new BABYLON.Vector3(0, 1, 0), this.scene);

    //    // Finally time to add some meshes
    //    // Create sphere shape and place it above ground
    //    let sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, this.scene);
    //    sphere.position.y = 1; //not a magic number, but half or our diameter and height
    //    sphere.material = new BABYLON.StandardMaterial("material", this.scene);
    //    sphere.material.wireframe = true;
    //    this.ShowNormals(sphere, 0.25, new BABYLON.Color3(1, 0, 0), this.scene);

    //    // Make a plane on the ground
    //    let ground = BABYLON.MeshBuilder.CreateGround('groundPlane', { width: 6, height: 6, subdivisions: 2 }, this.scene);


    //    // Wire up Mouse wheel 
    //    //this.scene.onPrePointerObservable.add((pointerInfo: any, eventState: any) => {
    //    //    // console.log(pointerInfo);
    //    //    var event = pointerInfo.event;
    //    //    var delta = 0;
    //    //    if (event.wheelDelta) {
    //    //        delta = event.wheelDelta;
    //    //    }
    //    //    else if (event.detail) {
    //    //        delta = -event.detail;
    //    //    }
    //    //    if (delta) {
    //    //        console.log(delta);
    //    //        var dir = this.scene.activeCamera.getDirection(BABYLON.Axis.Z);
    //    //        // console.log("dir: ", dir);
    //    //        if (delta > 0)
    //    //            this.scene.activeCamera.position.addInPlace(dir);
    //    //        else
    //    //            this.scene.activeCamera.position.subtractInPlace(dir);
    //    //    }
    //    //}, BABYLON.PointerEventTypes.POINTERWHEEL, false);
    //}

    //private Run(): void {
    //    this._engine.runRenderLoop(() => {
    //        this.scene.render();
    //    });
    //}





    private ShowNormals(mesh: BABYLON.Mesh, size, color, sc: BABYLON.Scene): BABYLON.LinesMesh {
        var normals = mesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);
        var positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        color = color || BABYLON.Color3.White();
        size = size || 1;

        var lines = [];
        for (var i = 0; i < normals.length; i += 3) {
            var v1 = BABYLON.Vector3.FromArray(positions, i);
            var v2 = v1.add(BABYLON.Vector3.FromArray(normals, i).scaleInPlace(size));
            lines.push([v1.add(mesh.position), v2.add(mesh.position)]);
        }
        var normalLines = BABYLON.MeshBuilder.CreateLineSystem("normalLines", { lines: lines }, sc);
        normalLines.color = color;
        return normalLines;
    }
}
