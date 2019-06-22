import { injectable } from  "inversify";
import { Dictionary } from "../libs/typescript-collections/src/lib";
import { UIElement } from "../Xaml/jupiter/Core";

@injectable()
export class VisualTree {

    private _flatList: Dictionary<string, UIElement>;

    constructor() {
        this._flatList = new Dictionary<string, UIElement>();
    }

    public Add(key: string, value: UIElement): void {
        if (key === undefined || key === null) { return; }
        this._flatList.setValue(key, value);
    }
    public Get(key: string): UIElement { return this._flatList.getValue(key); }    
}