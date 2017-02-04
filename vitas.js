const Vitas = (() => {

    const _categoryStorer = Symbol('categoryStorer');
    const _downloadListener = Symbol('downloadListener');
    const _idGenerator = Symbol('idGenerator');
    const _popupAgent = Symbol('popupAgent');


    class Vitas {

        constructor(categoryStorer, downloadListener, idGenerator, popupAgent) {
            this[_categoryStorer] = categoryStorer;
            this[_downloadListener] = downloadListener;
            this[_idGenerator] = idGenerator;
            this[_popupAgent] = popupAgent;

            initilize.call(this);
        }

        start() {

        }
    }

    function initilize() {

    }

    return Vitas;

})();