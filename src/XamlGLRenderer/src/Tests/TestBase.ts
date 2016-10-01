import * as Collections from "./../Libs/typescript-collections/src/lib";

export class TestBase {
    private _results: Collections.LinkedList<string>;

    constructor(public TestSet: string) {
        this._results = new Collections.LinkedList<string>();
    }

    LogResult(result: string): void {
        this._results.add(result);
    }

    GetResults(): string {
        let runningResults: string = `[${this.TestSet}]\n\r`;
        this._results.forEach((x : string) => { runningResults += x + "\n\r"; });
        return runningResults;
    }
    BeginUnitTest(unitTestName: string): void {
        this.LogResult(`[STARTED ${ Date.now }] ${unitTestName}`);
    }
    EndUnitTest(unitTestName: string): void {
        this.LogResult(`[ENDED ${Date.now }] ${unitTestName}`);
    }
    ShouldBeTrue(scope:string, test: boolean): void {
        let result: boolean = (test === true);
        if (result === true) {
            this.LogResult(`${scope} [passed]`);
        } else {
            this.LogResult(`${scope} [failed]`);
        }
    }
}