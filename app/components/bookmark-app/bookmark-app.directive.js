angular.module('gt.components.bookmark-app', ['generateTagsMap-service', 'getQueryParameter-service', 'mongolab-factory'])
.directive('bookmarkApp', function (generateTagsMap, getQueryParameter, mongolabFactory, $timeout) {
    return {
        templateUrl: 'app/components/bookmark-app/bookmark-app.html',
        scope: {},
        controllerAs: 'ctrl',
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

            $scope.filter = getQueryParameter('filter') || 'none';

            mongolabFactory.query().$promise.then(function(data) {
                $scope.bookmarks = data;
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
