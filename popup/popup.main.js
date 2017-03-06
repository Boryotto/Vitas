let messageRouter = new MessageRouter();
let vitasAgent = new VitasAgent(messageRouter);
let popup = new Popup(vitasAgent);

console.info("injecting popup to page...");
let popupInjector = new PopupInjector();
popupInjector.injectPopupToElement(document.body);

console.debug("calling test...");
vitasAgent.test();