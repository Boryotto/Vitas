const DownloadListener = (() => {

    class DownloadListener {
        constructor() {

        }

        // callback: function( DownloadItem downloadItem) {...};
        addOnDownloadListener(callback) {
            chrome.downloads.onCreated.addListener(callback);
        }

        // a suggester is a function like: function( DownloadItem downloadItem, function suggest) {...}
        addAsyncFilenameSuggester(suggester) {
            chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
                suggester(downloadItem, suggest);
                return true;
            });
        }
    }

    return DownloadListener;

})();