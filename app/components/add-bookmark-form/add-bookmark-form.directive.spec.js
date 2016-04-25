describe('gt.components.add-bookmark-form', function () {
    var object;
    beforeEach(module('gt.components.add-bookmark-form', function($provide) {
        object = [{ name: 'value' }];
        $provide.factory('mongolabFactory', function($q) {
            return {
                'save': function() {
                    var fakePromise = $q.defer();
                    fakePromise.resolve(object);
                    return {$promise:fakePromise.promise};
                },
                'update': function() {
                    var fakePromise = $q.defer();
                    fakePromise.resolve(object);
                    return {$promise:fakePromise.promise};
                }
            };
        });
    }));

    var directive;
    beforeEach(inject(function ($compile, $rootScope, directiveBuilder) {
        directive = directiveBuilder.$build('<add-bookmark-form></add-bookmark-form>', {
            edit: [{}]
        });
    }));

    it('clearBookmarkInfo should clear the form', function () {
        var scope = directive.scope;
        scope.tags = '';
        scope.clearBookmarkInfo();
    });

    it('saveBookmark should save new bookmark', function () {
        var scope = directive.scope;
        scope.tags = '';
        scope.bookmarks = [
            {
                id: 0,
                _id: {
                    $oid: ''
                },
                title: 'test',
                url: 'test',
                tags: 'test,test'
            }
        ];
        scope.bookmarkUrl = 'a';
        scope.bookmarkTitle = 'a';
        scope.tags = 'a';
        scope.editingBookmarkId = null;
        scope.saveBookmark();
    });

    it('saveBookmark should update bookmark', function () {
        var scope = directive.scope;
        scope.tags = '';
        scope.bookmarks = [
            {
                id: 0,
                _id: {
                    $oid: ''
                },
                title: 'test',
                url: 'test',
                tags: 'test,test'
            }
        ];
        scope.editingBookmarkId = 0;
        scope.saveBookmark();
    });

    it('saveBookmark should throw an error', function () {
        var scope = directive.scope;
        scope.editingBookmarkId = null;
        scope.errorMsg = '';
        scope.saveBookmark();
        expect(scope.errorMsg).toEqual("Please fill all fields!");
    });
});
