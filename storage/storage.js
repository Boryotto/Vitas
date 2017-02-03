const CategoryStorer = (() => {

    const _categories = Symbol('categories');
    const _categoryRegistryStorageKey = Symbol('categoryRegistryStorageKey');
    const _categoriesRetreivedFromServer = Symbol('categoriesRetreivedFromServer');

    class CategoryStorer {
        constructor(categoryRegistryStorageKey) {
            this[_categoryRegistryStorageKey] = categoryRegistryStorageKey;
            this[_categories] = {};
            this[_categoriesRetreivedFromServer] = false;
        }

        // returns a promise to when the object will be stored;
        store(category) {
            return new Promise((resolve, reject) => {
                getCategories.call(this).then((categories) => {
                    categories[category.id] = category;
                    chrome.storage.sync.set(categories, () => {
                        if (chrome.runtime.lastError == undefined) {
                            resolve();
                        } else {
                            reject(chrome.runtime.lastError);
                        }
                    });
                });

            });

        }

        retreive(categoryId) {
            return new Promise((resolve) => {
                getCategories().then((categories) => {
                    resolve(categories[categoryId]);
                });
            });
        }

        remove (categoryId) {
            return new Promise((resolve, reject) => {
                chrome.storage.sync.remove(categoryId, () => {
                    if (chrome.runtime.lastError == undefined) {
                        resolve();
                    } else  {
                        reject(chrome.runtime.lastError);
                    }
                });
            });
        }

        getAllCategories() {
            return new Promise((resolve) => {
                getCategories.call(this).then((categories) => {
                    resolve(categories);
                });
            });
        }
    }

    // returns a promise
    function getCategories() {
        return new Promise((resolve) => {
            if (!this[_categoriesRetreivedFromServer]) {
                this[_categories] = {};
                chrome.storage.sync.get(this[_categoryRegistryStorageKey], (item) => {
                    this[_categories] = item;
                    this[_categoriesRetreivedFromServer] = true;
                    resolve(this[_categories]);
                });
            } else { // if the category
                resolve(this[_categories]);
            }
        });

    }

    function isObjectEmpty(object) {
        return Object.keys(object).length === 0 && object.constructor === Object;
    }

    return CategoryStorer;

})();
