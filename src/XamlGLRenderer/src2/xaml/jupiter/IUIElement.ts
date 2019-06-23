export interface IUIElement {
    IsVisible: boolean;
    IsDirty: boolean;
    UniqueID: string;
    Name: string;
    Parent: IUIElement;
    LoadFromNode(node: any): void;
}