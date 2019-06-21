export interface IUIElement {
    IsVisible: boolean;
    IsDirty: boolean;
    UniqueID: string;
    Name: string;
    LoadFromNode(node: any): void;
}