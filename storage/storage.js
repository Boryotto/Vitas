const CategoryStorer = (() => {

    const _categories = Symbol('categories');
    const _categoryRegistryStorageKey = Symbol('categoryRegistryStorageKey');
    const _categoriesRetreivedFromServer = Symbol('categoriesRetreivedFromServer');

    class CategoryStorer {
        constructor(categoryRegistryStorageKey) {
            this[_categoryRegistryStorageKey] = categoryRegistryStorageKey;
            this[_categoriesRetreivedFromServer] = false;
            this[_categories] = {};
        }

        // returns a promise to when the object will be stored;
        store(category) {
            return new Promise((resolve, reject) => {
                getCategories.call(this).then((categories) => {
                    categories[category.id] = category;
                    saveObjectToChromeSync(this[_categoryRegistryStorageKey], categories).then(() => resolve()).catch(reason => reject(reason));
                }).catch(reason => reject(reason));
            });
        }

        retreive(categoryId) {
            return new Promise((resolve, reject) => {
                getCategories().then(categories => resolve(categories[categoryId])).catch(reason => reject(reason));
            });
        }

        remove(categoryId) {
            return new Promise((resolve, reject) => {
                getCategories.call(this).then(categories => {
                    delete categories[categoryId];
                    saveObjectToChromeSync(this[_categoryRegistryStorageKey], categories).then(() => resolve()).catch(reason => reject(reason));
                }).catch(reason => reject(reason));
            });
        }

        getAllCategories() {
            return getCategories.call(this);
        }

        removeAllCategories() {
            return removeKeyFromChromeSync.call(this, this[_categoryRegistryStorageKey]);
        }
    }

    // returns a promise
    function getCategories() {
        return new Promise((resolve, reject) => {
            if (this[_categoriesRetreivedFromServer]) {
                resolve(this[_categories]);
            } else {
                this[_categories] = {};
                chrome.storage.sync.get(this[_categoryRegistryStorageKey], (item) => {
                    if (chrome.runtime.lastError == undefined) {
                        this[_categoriesRetreivedFromServer] = true;
                        let restoredCategories = item[this[_categoryRegistryStorageKey]];
                        if (restoredCategories != undefined) {
                            this[_categories] = restoredCategories;
                        }
                        resolve(this[_categories]);
                    } else {
                        reject(chrome.runtime.lastError);
                    }
                });
            }
        });
    }

    function saveObjectToChromeSync(key, object) {
        return new Promise((resolve, reject) => {
            let storedObject = {};
            storedObject[key] = object;
            chrome.storage.sync.set(storedObject, () => {
                if (chrome.runtime.lastError == undefined) {
                    resolve();
                } else {
                    reject(chrome.runtime.lastError);
                }
            });
        });
    }

    function removeKeyFromChromeSync(key) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.remove(key, () => {
                if (chrome.runtime.lastError == undefined) {
                    resolve();
                } else {
                    reject(chrome.runtime.lastError);
                }
            })
        });
    }

    function isObjectEmpty(object) {
        return Object.keys(object).length === 0 && object.constructor === Object;
    }

    return CategoryStorer;

})();
