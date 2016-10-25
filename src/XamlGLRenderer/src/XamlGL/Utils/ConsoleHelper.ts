export class ConsoleHelper {
    public static LogSectionHeader(title: string): void {
        console.log("\u005F".repeat(title.length));
        console.log(title);
        console.log("\u203E".repeat(title.length));
    }
    public static LogSection(title: string): void {
        console.log("\u2212\u2212\u2212\u2282" + " " + title + " " + "\u2283\u2212\u2212\u2212");
    }
    public static Log(title: string): void {
        console.log("\u2609 " + title);
    }
    public static LogPad(title: string, padding: number): void {
        let uc: string = "\u2609 ";
        if (padding === 0) {
            uc = "\u22EF ";
        } else if (padding === 5) {
            uc = "\u263C ";
        } else if (padding === 10) {
            uc = "\u2646 ";
        } else if (padding === 15) {
            uc = "\u2645 ";
        } else if (padding === 20) {
            uc = "\u2600 ";
        } else if (padding === 25) {
            uc = "\u26C4 ";
        }
        console.log(" ".repeat(padding) + uc + title);
    }
}

// list of unicode symbols : https://en.wikibooks.org/wiki/Unicode/List_of_useful_symbols