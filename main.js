const idLength = 10;
const categoryRegistryStorageKey = 'categories';

let categoryStorer = new CategoryStorer(categoryRegistryStorageKey);
let downloadListener = new DownloadListener();
let idGenerator = new IdGenerator();

let vitas = new Vitas(categoryStorer, downloadListener, idGenerator);

vitas.start();