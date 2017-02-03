const idLength = 10;
const categoryRegistryStorageKey = 'categories';

let categoryStorer = new CategoryStorer(categoryRegistryStorageKey);
let downloadListener = new DownloadListener();

let vitas = new Vitas(categoryStorer, downloadListener);

vitas.start();

let c = new Category(generateId(idLength), 'foo', null);
let b = new Category(generateId(idLength), 'bar', null);
// categoryStorer.store(c).then(() => console.log(c));
// categoryStorer.store(b).then(() => console.log(b));

// categoryStorer.removeAllCategories().then(() => console.log('done'));

categoryStorer.getAllCategories().then(categories => console.log(categories));

function generateId(length) {

    let maxId = 0;
    for (let i = 0; i < length; i++) {
        maxId += 9 * Math.pow(10, i);
    }

    return Math.floor(Math.random() * maxId);
}
