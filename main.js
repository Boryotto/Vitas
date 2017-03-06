const idLength = config.generatedIdLength;
const categoryRegistryStorageKey = 'categories';

let categoryStorer = new CategoryStorer(categoryRegistryStorageKey);
let downloadListener = new DownloadListener();
let idGenerator = new IdGenerator();
let popupAgent = new PopupAgent();

let vitas = new Vitas(categoryStorer, downloadListener, idGenerator, popupAgent);

vitas.start();

popupAgent.display();

let messageRouter = new MessageRouter();
let route = new MessageRoute('GET', 'downloads/4', () => {
    console.log("callback called!!!");
});

messageRouter.addMessageRoute(route);

messageRouter.removeMessageRoute(route.messageType, route.hook);
