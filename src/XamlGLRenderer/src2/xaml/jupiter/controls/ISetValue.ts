export interface ISetValue {
    SetValue(propertyName: string, value: any): void;
    RefreshCtrlProperty(propertyName: string): void;
    ClearCtrl(): void;
    CreateCtrl(): void;
}