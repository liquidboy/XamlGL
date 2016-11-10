import { Control } from "./Control";
import { UIElement } from "./../UIElement";

export class ContentControl extends Control {
    private _content: UIElement;

    get Content(): UIElement { return this._content; }

    set Content(value: UIElement) { this._content = value; }
}