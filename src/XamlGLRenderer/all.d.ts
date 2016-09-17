declare module "XamlGL/Renderer" {
    export class Renderer {
        constructor();
        Test(): void;
    }
}
declare module "XamlGL/Core" {
    export * from "XamlGL/Renderer";
}
declare module "Bootstrap/XamlApp" {
    export class XamlApp {
        element: HTMLElement;
        span: HTMLElement;
        timerToken: number;
        constructor(element: HTMLElement);
        Start(): void;
        Stop(): void;
    }
}
