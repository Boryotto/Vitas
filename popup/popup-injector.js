const PopupInjector = (() => {

    class PopupInjector {

        constructor() {

        }

        // injects the popup html from the /popup-page/index.html file using JQuery's load function
        injectPopupToElement(element) {
            console.log(chrome.extension.getURL('popup/popup-page/index.html'));
            let popupContainer = document.createElement('div');
            popupContainer.id = 'vitas-popup-container';
            // popupContainer.classList = 'vitas-hidden';
            document.body.appendChild(popupContainer);

            $('#vitas-popup-container').load(chrome.extension.getURL('popup/popup-page/index.html'));
        }
    }

    return PopupInjector;
})();