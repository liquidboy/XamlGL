import { IPlatform } from "./Platform/IPlatform";
export interface IUIElement {
    IsVisible: boolean;
    IsDirty: boolean;
    Platform: IPlatform;
}