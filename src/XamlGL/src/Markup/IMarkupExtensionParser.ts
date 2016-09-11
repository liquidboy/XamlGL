module XamlGL.Markup {
    export interface INsPrefixResolver {
        lookupNamespaceURI(prefix: string): string;
    }
    export interface IMarkupExtensionParser {
        setNamespaces(defaultXmlns: string, xXmlns: string): IMarkupExtensionParser;
        onResolveType(cb?: Events.IResolveType): IMarkupExtensionParser;
        onResolveObject(cb?: Events.IResolveObject): IMarkupExtensionParser;
        onResolvePrimitive(cb?: Events.IResolvePrimitive): IMarkupExtensionParser;
        onError(cb?: Events.IError): IMarkupExtensionParser;
        parse(val: string, resolver: INsPrefixResolver, os: any[]): any;
    }
}