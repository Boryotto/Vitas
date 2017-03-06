const MessageRouter = (() => {

    const _messageRoutes = Symbol('messageRoutes');

    class MessageRouter {

        constructor() {
            this[_messageRoutes] = {};
        }

        // checks if message has a registered hook. If so, it will return the callback.
        getCallbackForMessage(messageType, hook) {
            if (this[_messageRoutes][hook] != null) {
                return this[_messageRoutes][hook][messageType];
            }
            return null;
        }

        // The messageRoute.messageType property is case insensitive
        addMessageRoute(messageRoute) {
            let messageType = messageRoute.messageType;

            if (this[_messageRoutes][messageRoute.hook] == null) {
                this[_messageRoutes][messageRoute.hook] = {};
            }
            this[_messageRoutes][messageRoute.hook][messageType] = messageRoute;
        }

        removeMessageRoute(messageType, hook) {
            delete this[_messageRoutes][hook][messageType];
            if (Object.keys(this[_messageRoutes][hook]).length === 0) {
                delete this[_messageRoutes][hook];
            }
        }

    }

    return MessageRouter;

})();