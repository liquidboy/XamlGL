import { IPlatform } from "./IPlatform";
import { IFrameworkElement } from "./../IFrameworkElement";

export interface IPlatformPage {
    CreatePlatform(): IPlatform;
    IsLoading: boolean;
}