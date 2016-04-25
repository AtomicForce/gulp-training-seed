angular.module('gt.components.add-bookmark-form', ['generateTagsMap-service'])
.directive('addBookmarkForm', function (generateTagsMap, mongolabFactory) {
    return {
        templateUrl: 'app/components/add-bookmark-form/add-bookmark-form.html',
        link: function ($scope, $element, $attr) {
            $scope.editingBookmarkId = null;

            $scope.$watch('edit', function() {
                if ($scope.edit[0]) {
                    $scope.editingBookmarkId = $scope.edit[0].id;
                    $scope.bookmarkUrl = $scope.edit[0].url;
                    $scope.bookmarkTitle = $scope.edit[0].title;
                    $scope.tags = $scope.edit[0].tags;
                }
            });

            $scope.saveBookmark = function() {
                if ($scope.bookmarkUrl && $scope.bookmarkTitle && $scope.tags && $scope.editingBookmarkId === null) {
                    var bookmarkId = $scope.bookmarks.length ? $scope.bookmarks.length : 0;

                    var item = {
                        id: bookmarkId,
                        url: $scope.bookmarkUrl,
                        title: $scope.bookmarkTitle,
                        tags: $scope.tags.split(',')
                    };

                    mongolabFactory.save(item).$promise.then(function(resource) {
                        $scope.bookmarks.push(resource);

                        $scope.tagsMap = generateTagsMap($scope.bookmarks, $scope);
                    });
                } else if ($scope.editingBookmarkId !== null) {
                    var _tmp = {
                        id: $scope.editingBookmarkId,
                        url: $scope.bookmarkUrl,
                        title: $scope.bookmarkTitle,
                        tags: $scope.tags.split(',')
                    };

                    $scope.bookmarks.forEach(function(bookmark) {
                        if (bookmark.id === $scope.editingBookmarkId) {
                            mongolabFactory.update({id: bookmark._id.$oid}, _tmp).$promise.then(function(resource) {
                                bookmark.url = $scope.bookmarkUrl;
                                bookmark.title = $scope.bookmarkTitle;
                                bookmark.tags = $scope.tags.split(',');

                                $scope.tagsMap = generateTagsMap($scope.bookmarks, $scope);
                            });
                        }
                    });
                } else {
                    $scope.errorMsg = "Please fill all fields!";
                }
            };

            $scope.clearBookmarkInfo = function() {
                $scope.bookmarkUrl = '';
                $scope.bookmarkTitle = '';
                $scope.tags = '';
                $scope.editingBookmarkId = null;
            };
        }
    };
});
