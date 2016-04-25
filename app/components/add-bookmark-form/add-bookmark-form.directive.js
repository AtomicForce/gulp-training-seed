angular.module('gt.components.add-bookmark-form', ['generateTagsMap-service'])
.directive('addBookmarkForm', function (generateTagsMap, mongolabFactory) {     
    return {
        templateUrl: 'app/components/add-bookmark-form/add-bookmark-form.html',
        link: function ($scope, $element, $attr) {
            $scope.editingBookmarkId = null;
            $scope.$watch('edit', function() {
                if ($scope.edit[0]) {
                    $scope.editingBookmarkId = $scope.edit[0].id;
                    bookmarkUrl.value = $scope.edit[0].url;
                    bookmarkTitle.value = $scope.edit[0].title;
                    tags.value = $scope.edit[0].tags;
                }
            });

            $scope.saveBookmark = function() {
                if (bookmarkUrl.value && bookmarkTitle.value && tags.value && $scope.editingBookmarkId === null) {
                    var bookmarkId = $scope.bookmarks.length ? $scope.bookmarks.length : 0;

                    var item = {
                        id: bookmarkId,
                        url: bookmarkUrl.value,
                        title: bookmarkTitle.value,
                        tags: tags.value.split(',')
                    };

                    mongolabFactory.save(item).$promise.then(function(resource) {
                        $scope.bookmarks.push(resource);

                        $scope.tagsMap = generateTagsMap($scope.bookmarks, $scope);
                    });
                } else if ($scope.editingBookmarkId !== null) {
                    $scope.bookmarks.forEach(function(bookmark) {
                        if (bookmark.id === $scope.editingBookmarkId) {
                            mongolabFactory.update({id: bookmark._id.$oid}, bookmark).$promise.then(function(resource) {
                                bookmark.url = bookmarkUrl.value;
                                bookmark.title = bookmarkTitle.value;
                                bookmark.tags = tags.value.split(',');

                                $scope.tagsMap = generateTagsMap($scope.bookmarks, $scope);
                            });
                        }
                    });
                } else {
                    $scope.errorMsg = "Please fill all fields!";
                }
            };

            $scope.clearBookmarkInfo = function() {
                bookmarkUrl.value = '';
                bookmarkTitle.value = '';
                tags.value = '';
                $scope.editingBookmarkId = null;
            };
        }
    };
});
