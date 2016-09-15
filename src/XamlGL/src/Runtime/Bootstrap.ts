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
        
        function resolveConfig(): Promise<void> {
            return new Promise<void>((resolve, reject) => {
                //Fayde.LoadConfigJson((config, err) => {
                //    if (err)
                //        console.warn('Could not load fayde configuration file.', err);
                //    resolve();
                //});
            });
        }
        function getApp(): Promise<XamlMarkup> {
            return Markup.Retrieve(appUrl);
        }
        function finishError(err: any) {
            console.error("An error occurred retrieving the application.", err);
        }


        resolveConfig()
            .then(getApp, finishError)
    }

}