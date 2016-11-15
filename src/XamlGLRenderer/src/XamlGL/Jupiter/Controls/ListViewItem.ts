import * as Jupiter from "./../Core";
// import { Orientation } from "./../../DataTypes/Orientation";
// import { UIElement } from "./../UIElement";

export class ListViewItem extends Jupiter.FrameworkElement {
    private _content: string = null;

    get Content(): string { return this._content; }

    set Content(value: string) { this._content = value; }
}