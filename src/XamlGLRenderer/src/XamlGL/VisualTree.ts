/// <reference path="../../typings/globals/pixi.js/index.d.ts" />

import * as Collections from "./../Libs/typescript-collections/src/lib";
import { IFrameworkElement } from "./Jupiter/IFrameworkElement";

export class VisualTree {
    private _children: Collections.LinkedList<VisualTreeNode>;
    get Children(): Collections.LinkedList<VisualTreeNode> { return this._children; }

    constructor() {
        this._children = new Collections.LinkedList<VisualTreeNode>();
    }

    Find(id: string): VisualTreeNode {
        let foundNode: VisualTreeNode = null;
        this._children.forEach((x: VisualTreeNode) => {
            foundNode = x.Find(id);
            if (foundNode !== null) {
                return;
            }
        });
        return foundNode;
    }
}


export class VisualTreeNode {
    private _children: Collections.LinkedList<VisualTreeNode>;
    get Children(): Collections.LinkedList<VisualTreeNode> { return this._children; }

    constructor(public Name: string = null, public ID: string = null, public BackingElement: IFrameworkElement) {
        this._children = new Collections.LinkedList<VisualTreeNode>();
    }
    Find(id: string): VisualTreeNode {
        if (this.ID === id) {
            return this;
        }
        let foundNode: VisualTreeNode = null;
        this._children.forEach((vtn: VisualTreeNode) => {
            foundNode = vtn.Find(id);
            if (foundNode !== null) {
                return null;
            }
        });
        return foundNode;
    }
}