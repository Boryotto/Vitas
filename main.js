const idLength = 10;
const categoryRegistryStorageKey = 'categories';

let categoryStorer = new CategoryStorer(categoryRegistryStorageKey);
let downloadListener = new DownloadListener();

let vitas = new Vitas(categoryStorer, downloadListener);

vitas.start();


function generateId(length) {

    let maxId = 0;
    for (let i = 0; i < length; i++) {
        maxId += 9 * Math.pow(10, i);
    }

    return Math.floor(Math.random() * maxId);
}
