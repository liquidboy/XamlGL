import { UIElement } from "../UIElement";

export class Code extends UIElement {

    constructor() {
        super();
    }

    public Initialize(): void {

    }

    public LoadFromNode(node: any): void {
        try {
            let parser: DOMParser = new DOMParser();
            let scriptFound: Document = parser.parseFromString(node.innerHTML, "text/html");
            this.Code = scriptFound.body.innerText;
            this.HasCode = true;
        } catch (e) { }
        super.LoadFromNode(node);
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            if (this.HasCode) {
                parent.HasCode = true;
                parent.Code = this.Code;
            }
            return true;
        }
        return false;
    }
}