import { Window } from './Window';

export class WindowManager {
    windows: Window[] = new Array();
    private _gl: any;
    private _windowCount: number = 0;

    constructor(gl) {
        this._gl = gl;
    }

    public Create(width: number, height: number): Window {
        let gui = new Window(this._gl);
        gui.windowSizes = [width, height];
        this.windows[this._windowCount] = gui;
        this._windowCount++;
        return gui;
    }

    public Get(index: number): Window {
        return this.windows[index];
    }
}