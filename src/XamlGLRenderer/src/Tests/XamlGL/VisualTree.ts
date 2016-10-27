import * as XamlGL from "./../../XamlGL/Core";
import { TestBase } from "./../TestBase";

export class Tests extends TestBase {
    constructor() {
        super("VisualTree");
    }
    public Run(): string {
        this.test001("VisualTree should have a children collection that can accept VisualTreeNode");
        return this.GetResults();
    }
    private test001(testDescription: string): void {
        this.BeginUnitTest(testDescription);

        let vt: XamlGL.VisualTree = new XamlGL.VisualTree();
        this.ShouldBeTrue("has children", vt.Children !== null);
        vt.Children.add(new XamlGL.VisualTreeNode("test001","test001", null));
        this.ShouldBeTrue("adding VisualTreeNode element", vt.Children.size() === 1);
        this.ShouldBeTrue("added element saved Name successfully", vt.Children.first().Name === "test001");

        this.EndUnitTest(testDescription);
    }
}