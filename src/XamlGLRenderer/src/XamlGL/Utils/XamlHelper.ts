import { XamlMarkup } from "./../Reader/XamlMarkup";
import { FrameworkElement } from "./../Jupiter/FrameworkElement";
import { Grid } from "./../Controls/Grid";
import { Image } from "./../Controls/Image";
import { Rectangle } from "./../Controls/Rectangle";


export class XamlHelper {
    public static XamlMarkupToUIElement(xaml: XamlMarkup): FrameworkElement {
        let sampleUI: Grid = new Grid();
        let img: Image = new Image();
        let rect: Rectangle = new Rectangle();

        img.Source = "\assets\silverlight_anims.jpg";
        img.Width = 80;
        img.Height = 80;
        sampleUI.Children.add(img);

        rect.Width = 500;
        rect.Height = 300;
        rect.Background = "Red";
        sampleUI.Children.add(rect);

        return sampleUI;
    }
}