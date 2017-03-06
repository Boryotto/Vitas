const Popup = (() => {

    const _vitasAgent = Symbol('vitasAgent');

    class Popup {

        constructor(vitasAgent) {
            this[_vitasAgent] = vitasAgent;
        }

    }

    return Popup;

})();