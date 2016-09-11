module XamlGL {
    export interface ITypeResolver {
        resolveType(moduleName: string, name: string, /* out */oresolve: IOutType): boolean;
    }
}