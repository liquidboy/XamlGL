import { Animations } from "./controls/Core";

export interface IAnimatableUIElement {
    Animations: Animations;
    StartAnimation(): void;
    StopAnimation(): void;
}