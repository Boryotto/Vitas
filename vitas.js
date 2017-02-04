const Vitas = (() => {

    const _categoryStorer = Symbol('categoryStorer');
    const _downloadListener = Symbol('downloadListener');
    const _idGenerator = Symbol('idGenerator');
    
    class Vitas {

        constructor(categoryStorer, downloadListener, idGenerator) {
            this[_categoryStorer] = categoryStorer;
            this[_downloadListener] = downloadListener;
            this[_idGenerator] = idGenerator;
            
            initilize.call(this);
        }

        start() {

        }
    }

    function initilize() {

    }

    return Vitas;

})();