const Vitas = (() => {

    const _categoryStorer = Symbol('categoryStorer');
    const _downloadListener = Symbol('downloadListener');

    class Vitas {

        constructor(categoryStorer, downloadListener) {
            this[_categoryStorer] = categoryStorer;
            this[_downloadListener] = downloadListener;
            
            initilize.call(this);
        }

        start() {

        }
    }

    function initilize() {

    }

    return Vitas;

})();