import { IEventArgs } from "./../Events/IEventArgs";
export class KeyPressedEventArgs implements IEventArgs {
    KeyCode: string;
    Key: string;
}