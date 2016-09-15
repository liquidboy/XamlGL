module XamlGL.Markup {
    import XamlMarkup = XamlGL.Markup.Xaml.XamlMarkup;

    export class Markup<T> {
        uri: Uri;
        root: T;

        private $$isLoaded = false;

        constructor(uri: string) {
            this.uri = new Uri(uri);
        }

        get isLoaded(): boolean { return this.$$isLoaded; }

        createParser(): IMarkupParser<T> {
            return NO_PARSER;
        }

        resolve(typemgr: ITypeManager, customCollector?: ICustomCollector, customExcluder?: ICustomExcluder): Promise<any> {
            var resolver = new MarkupDependencyResolver<T>(typemgr, this.createParser());
            resolver.collect(this.root, customCollector, customExcluder);
            return resolver.resolve();
        }

        loadAsync(): Promise<Markup<T>> {
            var reqUri = "text!" + this.uri.toString();
            var md = this;
            return new Promise((resolve, reject) => {
                (<Function>require)([reqUri], (data: string) => {
                    md.setRoot(md.loadRoot(data));
                    this.$$isLoaded = true;
                    resolve(md);
                }, reject);
            });
        }

        loadRoot(data: string): T {
            return <T><any>data;
        }

        setRoot(markup: T): Markup<T> {
            this.root = markup;
            return this;
        }














    }
    export function Retrieve(uri: string): Promise<XamlMarkup>;
    export function Retrieve(uri: Uri): Promise<XamlMarkup>;
    export function Retrieve(uri: any): Promise<XamlMarkup> {
        var xm = XamlMarkup.create(uri);
        if (xm.isLoaded)
            return Promise.resolve(xm);
        return xm.loadAsync();
    }
}