import { Animations } from "./controls/Core";

export interface IAnimatableUIElement {
    Animations: Animations;
    InitializeAnimation(): void;
    StartAnimation(): void;
    StopAnimation(): void;
}