import 'bootstrap';
import { AppModule } from './app/app.module.browser';

if (module['hot']) {
    module['hot'].accept();
    module['hot'].dispose(() => {
        // Before restarting the app, we create a new root element and dispose the old one
        const oldRootElem = document.querySelector('app');
        const newRootElem = document.createElement('app');
        oldRootElem.parentNode.insertBefore(newRootElem, oldRootElem);

    });
} else {
    
}

window.onload = function (e) {
    window["mainApp"]  = new AppModule();
}
