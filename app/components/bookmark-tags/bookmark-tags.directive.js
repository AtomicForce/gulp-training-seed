angular.module('gt.components.bookmark-tags', ['generateTagsMap-service'])
.directive('bookmarkTags', function (generateTagsMap) {
    return {
        templateUrl: 'app/components/bookmark-tags/bookmark-tags.html',
        scope: true        
    };
});
