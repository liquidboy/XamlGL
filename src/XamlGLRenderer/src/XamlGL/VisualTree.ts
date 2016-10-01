/// <reference path="../../typings/globals/pixi.js/index.d.ts" />

import * as Collections from "./../Libs/typescript-collections/src/lib";

export class VisualTree {
    private _children: Collections.LinkedList<VisualTreeNode>;
    get Children(): Collections.LinkedList<VisualTreeNode> { return this._children; }

    constructor() {
        this._children = new Collections.LinkedList<VisualTreeNode>();
    }
}


export class VisualTreeNode {
    private _children: Collections.LinkedList<VisualTreeNode>;
    get Children(): Collections.LinkedList<VisualTreeNode> { return this._children; }

    constructor(public Name: string = null, public ID: string = null) {}

}