import { Scene } from "../jupiter/controls/Core";
import { UIElement } from "../jupiter/Core";

export class MeshNormalLines {

    constructor() {

    }

    public static Install(scene: Scene, mesh: BABYLON.Mesh): void {
        this.ShowNormals(mesh, 0.25, new BABYLON.Color3(1, 0, 0), scene.Ctrl);
    }

    private static ShowNormals(mesh: BABYLON.Mesh, size, color, sc: BABYLON.Scene): BABYLON.LinesMesh {
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
