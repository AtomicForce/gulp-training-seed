angular.module('generateTagsMap-service', []).factory('generateTagsMap', function() {
    return function(bookmarks, scope) {
        scope.tagsMap = {};

        bookmarks.forEach(function(bookmark) {
            if (bookmark.tags) {                            
                bookmark.tags.forEach(function(tag) {
                    if (scope.tagsMap[tag]) {
                        scope.tagsMap[tag] += 1;
                    } else {
                        scope.tagsMap[tag] = 1;
                    }
                });
            }
        });

        return scope.tagsMap;
    };
});
