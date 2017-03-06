let messageRouter = new MessageRouter();
let vitasAgent = new VitasAgent(messageRouter);
let popup = new Popup(vitasAgent);

console.log("calling test...");
vitasAgent.test();