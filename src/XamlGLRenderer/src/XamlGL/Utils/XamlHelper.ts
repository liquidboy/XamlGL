import { XamlMarkup } from "./../Reader/XamlMarkup";
import { FrameworkElement } from "./../Jupiter/FrameworkElement";
import { Grid } from "./../Controls/Grid";
import { Image } from "./../Controls/Image";


export class XamlHelper {
    public static XamlMarkupToUIElement(xaml: XamlMarkup): FrameworkElement {
        let sampleUI: Grid = new Grid();
        let img: Image = new Image();
        img.Source = "\assets\silverlight_anims.jpg";
        img.Width = 80;
        img.Height = 80;
        sampleUI.Children.add(img);
        return sampleUI;
    }
}