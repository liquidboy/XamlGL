import { UIElement } from "../UIElement";
import { ParticleSystem, Mesh } from "./Core";

export class Event extends UIElement {
    private _eventName: string;

    get EventName(): string { return this._eventName; }

    constructor() {
        super();
    }

    public Initialize(): void {
        //let evalFn: any = eval(this.Code);
    }

    public LoadFromNode(node: any): void {
        try { this._eventName= node.attributes["EventName"].value; } catch (e) { }
        
        try {
            let parser: DOMParser = new DOMParser();
            let scriptFound: Document = parser.parseFromString(node.innerHTML, "text/html");
            this.Code = node.childNodes[1].wholeText;
            this.HasScript = true;
        } catch (e) { }
        super.LoadFromNode(node);
    }

    TrySetParent(parent: UIElement): boolean {
        if (super.TrySetParent(parent)) {
            if (this.HasScript) {
                parent.ChildrenEvents.setValue(this.EventName, this);
            }
            return true;
        }
        return false;
    }
}