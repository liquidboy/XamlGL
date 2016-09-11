module XamlGL {
    import XamlMarkup = XamlGL.Markup.Xaml.XamlMarkup;

    export function Bootstrap(onLoaded?: (app: Application) => any) {
        console.warn("[Runtime/Bootstrap.ts] - XamlGL.Bootstrap");

        var url = document.body.getAttribute("xamlgl-app");
        if (!url) {
            console.warn("No application specified.");
            return;
        }
        
        bootstrapApp(url);
    }

    function bootstrapApp(appUrl: string) {
        
    }

}