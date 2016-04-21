angular.module('gt.components.bookmark-list', ['generateTagsMap-service', 'getQueryParameter-service'])
.directive('bookmarkList', function (generateTagsMap, mongolabFactory) {
    return {
        templateUrl: 'app/components/bookmark-list/bookmark-list.html',
        require: '^^bookmarkApp',
        link: function ($scope, $element, $attr, bookmarkAppCtr) {
            $scope.editBookmark = function(id) {
                bookmarkAppCtr.editBookmarkCtr(id);
            };

            $scope.deleteBookmark = function(id) {
                $scope.bookmarks.forEach(function(bookmark, i) {
                    if (bookmark.id === id) {
                        mongolabFactory.remove({id: bookmark._id.$oid});
                        
                        $scope.bookmarks.splice(i ,1);
                    }
                });

                $scope.tagsMap = generateTagsMap($scope.bookmarks, $scope);
            };

            $scope.filterTags = function(item) {
                if ($scope.filter === 'none') {
                    return item;
                } else {
                    return item.tags.indexOf($scope.filter) > -1;
                }
            };
        }
    };
});