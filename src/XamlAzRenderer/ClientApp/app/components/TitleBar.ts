export class TitleBar {
    // spacing between the title bars border, and the window title.
    public VerticalSpacing: number = 10;
    public Title: string = "Window Title";
    public Position: number[] = [0, 0];
    public Size: number[] = [0, 0];


    // Windows.UI.ViewManagement.ApplicationViewTitleBar
    // public ButtonInactiveBackgroundColor: string;
    // public ButtonHoverForegroundColor: string;
    // public ButtonHoverBackgroundColor: string;
    // public ButtonForegroundColor: string;
    // public ButtonBackgroundColor: string;
    // public ButtonInactiveForegroundColor: string;
    public BackgroundColor: [number, number, number] = [0.2, 0.4, 0.6];
    // public InactiveForegroundColor: string;
    // public InactiveBackgroundColor: string;
    // public ForegroundColor: string;
    // public ButtonPressedForegroundColor: string;
    // public ButtonPressedBackgroundColor: string;


    // Windows.ApplicationModel.Core.CoreApplicationViewTitleBar
    // public ExtendViewIntoTitleBar: boolean;
    public Height: number = 30;
    public IsVisible: boolean;
    // public SystemOverlayLeftInset: number;
    // public SystemOverlayRightInset: number;

    // IsVisibleChanged
    // LayoutMetricsChanged
}

