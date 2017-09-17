import { Window } from './Window';

export class WindowManager {
    windows: WindowMetadata[] = new Array();
    private _gl: any;
    private _windowCount: number = 0;

    constructor(gl) {
        this._gl = gl;
    }

    public Create(width: number, height: number): Window {
        let gui = new Window(this._gl);
        gui.windowSizes = [width, height];
        this.windows[this._windowCount] = new WindowMetadata( gui);
        this._windowCount++;
        return gui;
    }

    public Delete(index: number): void {
        let wm = this.windows[index];
        wm.WindowObj = null;
        wm.IsFree = false;
    }

    public Get(index: number): Window {
        return this.windows[index].WindowObj;
    }

    public HasMouseFocus(): boolean {
        for (let i = 0; i < this.windows.length; i++) {
            if (this.windows[i].WindowObj.hasMouseFocus()) {
                return true;
            }
        }
        return false;
    }
}

class WindowMetadata {
    public WindowObj: Window;
    public IsFree: boolean = false;
    public ZIndex: number = 0;
    constructor(win: Window) {
        this.WindowObj = win;
        this.IsFree = true;
        this.ZIndex = 1;
    }
}