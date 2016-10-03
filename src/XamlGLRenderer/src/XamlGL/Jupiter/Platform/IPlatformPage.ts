import { IPlatform } from "./IPlatform";

export interface IPlatformPage {
    CreatePlatform(): IPlatform;
}