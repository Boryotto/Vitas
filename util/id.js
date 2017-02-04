const IdGenerator = (() => {

    class IdGenerator {
        
        constructor() {

        }

        generateId(length) {
            let maxId = 0;
            for (let i = 0; i < length; i++) {
                maxId += 9 * Math.pow(10, i);
            }

            return Math.floor(Math.random() * maxId);
        }
    }

    return IdGenerator;

})();