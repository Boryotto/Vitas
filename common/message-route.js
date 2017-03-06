const MessageRoute = (() => {

    // A MessageRoute describes which function should be called
    // When a certain Message is received
    // * messageType - the type of message: Message.type
    // * hook - a string that identifies the message. Should be included in the headers of the message
    // * callback - a function (of type function (message) {}) to call when the message is received
    
    class MessageRoute {

        constructor(messageType, hook, callback) {
            this.messageType = messageType;
            this.hook = hook;
            this.callback = callback;
        }

    }

    return MessageRoute;

})();