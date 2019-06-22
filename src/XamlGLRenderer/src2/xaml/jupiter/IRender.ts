import { Scene } from "./controls/Core";

export interface IRender {
    Position: BABYLON.Vector3;
    Initialize(scene: Scene): void
}