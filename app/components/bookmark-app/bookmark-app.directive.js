angular.module('gt.components.bookmark-app', ['generateTagsMap-service', 'getQueryParameter-service'])
.directive('bookmarkApp', function (generateTagsMap, getQueryParameter, $timeout, mongolabFactory) {
    return {
        templateUrl: 'app/components/bookmark-app/bookmark-app.html',
        scope: {},
        controller: function($scope) {
            this.editBookmarkCtr = function(data) {
                $scope.edit = $scope.bookmarks.filter(function(bookmark) {
                    return bookmark.id === data;
                });
            };
        },
        link: function ($scope, $element, $attr) {
            $scope.tagsMap = {};
            $scope.edit = [];

            $scope.filter = getQueryParameter('filter');

            $scope.bookmarks = mongolabFactory.query(function() {
                $scope.tagsMap = generateTagsMap($scope.bookmarks, $scope);
            });

            $scope.filterResults = function() {
                $timeout(function () {
                    $scope.filter = getQueryParameter('filter');
                });
            };
        }
    };
});
