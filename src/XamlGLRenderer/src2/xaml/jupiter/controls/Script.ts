﻿import { UIElement } from "../UIElement";

export class Script extends UIElement {

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
            this.HasScript = true;
        } catch (e) { }
        super.LoadFromNode(node);
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            if (this.HasScript) {
                parent.HasScript = true;
                parent.Code = this.Code;
            }
            return true;
        }
        return false;
    }
}