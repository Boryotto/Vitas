const VitasAgent = (() => {

    // The contect-script is designed to accept only one connection at a time, from the vitas background logic
    const _connectedPort = Symbol('connectedPort');
    const _messageRouter = Symbol('messageRouter');

    class VitasAgent {

        constructor(messageRouter) {
            this[_connectedPort] = null;
            this[_messageRouter] = messageRouter;

            addOnConnectionListener.call(this);
        }

        onDisplayRequest(callback) {

        }

        // Gets all the categories to display
        // returns a promise
        getCategoryList() {
            return new Promise((resolve, reject) => {
                if (this[_connectedPort] == null) {
                    reject("There is no active connection");
                    return;
                }

                let getCategoriesMessage = new Message(
                    'GET',
                    {},
                    { resource: 'Categories' }
                );
                this[_connectedPort].postMessage(getCategoriesMessage);
            });
        }

        test() {
            let messageRoute = new MessageRoute('GET', 'getCategories', (message) => {
                console.log(message);
            });
            this[_messageRouter].addMessageRoute(this, messageRoute);
        }
    }

    function addOnConnectionListener() {
        chrome.runtime.onConnect.addListener(port => {
            this[_connectedPort] = port;
        });
    }

    // listenerCallback: function (port) {}
    function listenToConnection() {
        chrome.runtime.onConnect.addListener(port => {
            this[_connectedPort] = port;
        });
    }

    // Listens for a message and calles the specified method in the message hooks collection
    function listenForMessage() {

        if (this[_connectedPort] != null) {
            this[_connectedPort].onMessage = (message, port) => {
                let hook = message.hook;
                let messageType = message.type;
                let callback = this[_messageRouter].getCallbackForMessage(messageType, hook);
                callback();
            }
        }

    }

    return VitasAgent;

})();

