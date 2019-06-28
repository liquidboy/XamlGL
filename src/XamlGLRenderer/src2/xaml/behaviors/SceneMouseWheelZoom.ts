import { Scene } from "../jupiter/controls/Core";

export class SceneMouseWheelZoom {

    constructor() {

    }

    public static Install(scene: Scene): void {
        //Wire up Mouse wheel 
        scene.Ctrl.onPrePointerObservable.add((pointerInfo: any, eventState: any) => {
            // console.log(pointerInfo);
            var event = pointerInfo.event;
            var delta = 0;

            if (event.wheelDelta) delta = event.wheelDelta;
            else if (event.detail) delta = -event.detail;

            if (delta) {
                // console.log(delta);
                var dir = scene.Ctrl.activeCamera.getDirection(BABYLON.Axis.Z);
                // console.log("dir: ", dir);
                if (delta > 0) scene.Ctrl.activeCamera.position.addInPlace(dir);
                else scene.Ctrl.activeCamera.position.subtractInPlace(dir);
            }
        }, BABYLON.PointerEventTypes.POINTERWHEEL, false);
    }
}
