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
    public FindByName(key: string): any { return this.Get(key); }
    public Get(key: string): UIElement { return this._flatList.getValue(key); }
    public ParseScript(codeTemplate: string): string {
        let finalCode: string = codeTemplate;
        this._flatList.forEach((k: string, v: UIElement) => {
            finalCode += `var ${k}`;
            //finalCode.replace(`[${k}]`,
        });
        return "";
    }
}