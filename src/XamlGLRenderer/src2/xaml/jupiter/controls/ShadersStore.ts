import { UIElement } from "../UIElement";

export class ShadersStore extends UIElement {
    constructor() {
        super();
    }

    public Initialize(): void {
        BABYLON.Effect.ShadersStore[this.Name] = this.Code;
    }

    public LoadFromNode(node: any): void {
        try {
            let parser: DOMParser = new DOMParser();
            let scriptFound: Document = parser.parseFromString(node.innerHTML, "text/html");
            this.Code = scriptFound.body.innerText;            
        } catch (e) { }

        super.LoadFromNode(node);
    }
}