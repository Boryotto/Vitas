// A message that is passed between a content script and a background script

const Message = (() => {

    // The message is similar to an HTTP message:
    // Type (string): GET / POST / PUT / DELETE
    // Headers (Object): Additional information
    // Body (Object): the body of the message 
    class Message {

        constructor(type, headers, body) {
            this.type = type;
            this.headers = headers;
            this.body = body;
        }
    }

    return Message;
})();