const PopupAgent = (() => {

    class PopupAgent {

        constructor() {

        }

        display() {
            // connect to the active tab
            getActiveTab.call(this).then(tab => {

                let port = connectToTab.call(this, tab, 'popup-agent');
                port.postMessage('display');
            });
        }
    }

    function getActiveTab() {
        return new Promise((resolve, reject) => {
            chrome.tabs.query({ active: true }, queriedTabs => {
                if (queriedTabs.length > 0) {
                    resolve(queriedTabs[0]);
                } else {
                    reject('No tab was found.');
                }
            });
        });
    }

    // returns a runtime.Port object
    function connectToTab(tab, connectionName) {
        return chrome.tabs.connect(tab.id, { name: connectionName });
    }

    return PopupAgent;

})();