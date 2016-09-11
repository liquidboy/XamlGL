module XamlGL.Markup {
    export interface IMarkupParser<T> {
        on(listener: IMarkupSax<T>): IMarkupParser<T>
        setNamespaces(defaultXmlns: string, xXmlns: string): IMarkupParser<T>;
        setExtensionParser(parser: IMarkupExtensionParser): IMarkupParser<T>;
        parse(root: T);
        skipBranch();
        resolvePrefix(prefix: string): string;
        walkUpObjects(): IEnumerator<any>;
    }
    export var NO_PARSER: IMarkupParser<any> = {
        on(listener: IMarkupSax<any>): IMarkupParser<any> {
            return NO_PARSER;
        },
        setNamespaces(defaultXmlns: string, xXmlns: string): IMarkupParser<any> {
            return NO_PARSER;
        },
        setExtensionParser(parser: IMarkupExtensionParser): IMarkupParser<any> {
            return NO_PARSER;
        },
        parse(root: any) {
        },
        skipBranch(): any {
        },
        resolvePrefix(prefix: string): string {
            return "";
        },
        walkUpObjects(): IEnumerator<any> {
            return IEnumerator_.empty;
        }
    };


    export interface IMarkupSax<T> {
        resolveType?: Events.IResolveType;
        resolveObject?: Events.IResolveObject;
        resolvePrimitive?: Events.IResolvePrimitive;
        resolveResources?: Events.IResolveResources;
        branchSkip?: Events.IBranchSkip<T>;
        object?: Events.IObject;
        objectEnd?: Events.IObjectEnd;
        contentText?: Events.IText;
        name?: Events.IName;
        propertyStart?: Events.IPropertyStart;
        propertyEnd?: Events.IPropertyEnd;
        attributeStart?: Events.IAttributeStart;
        attributeEnd?: Events.IAttributeEnd;
        error?: Events.IResumableError;
        end?: () => any;
    }

    var oresolve: IOutType = {
        isPrimitive: false,
        type: Object
    };

    export function createMarkupSax<T>(listener: IMarkupSax<T>): IMarkupSax<T> {
        return {
            resolveType: listener.resolveType || ((uri, name) => oresolve),
            resolveObject: listener.resolveObject || ((type) => new (type)()),
            resolvePrimitive: listener.resolvePrimitive || ((type, text) => new (type)(text)),
            resolveResources: listener.resolveResources || ((owner, ownerType) => new Object()),
            branchSkip: listener.branchSkip || ((root, obj) => {
            }),
            object: listener.object || ((obj, isContent) => {
            }),
            objectEnd: listener.objectEnd || ((obj, isContent, prev) => {
            }),
            contentText: listener.contentText || ((text) => {
            }),
            name: listener.name || ((name) => {
            }),
            propertyStart: listener.propertyStart || ((ownerType, propName) => {
            }),
            propertyEnd: listener.propertyEnd || ((ownerType, propName) => {
            }),
            attributeStart: listener.attributeStart || ((ownerType, attrName) => {
            }),
            attributeEnd: listener.attributeEnd || ((ownerType, attrName, obj) => {
            }),
            error: listener.error || ((e) => true),
            end: listener.end || (() => {
            })
        };
    }
}