describe('gt.components.bookmark-list', function () {
    var object;
    beforeEach(module('gt.components.bookmark-list', function($provide) {
        object = [{ name: 'value' }];
        $provide.factory('mongolabFactory', function($q) {
            return {
                'remove': function() {
                    var fakePromise = $q.defer();
                    fakePromise.resolve(object);
                    return {$promise:fakePromise.promise};
                }
            };
        });
    }));

    var directive;
    beforeEach(inject(function ($compile, $rootScope, directiveBuilder) {
        directive = directiveBuilder.$build('<bookmark-list></bookmark-list>', {}, {bookmarkApp:{
            editBookmarkCtr: function() {

            }
        }});
    }));

    it('editBookmark should be called', function () {
        var scope = directive.scope;
        scope.editBookmark();
    });

    it('filterTags should be called', function () {
        var scope = directive.scope;
        scope.filterTags({
            title: 'test',
            url: 'test',
            tags: ['test','test']
        });
    });

    it('filterTags should be called with filter=none', function () {
        var scope = directive.scope;
        scope.filter = 'none';
        expect(scope.filterTags({
            title: 'test',
            url: 'test',
            tags: ['test','test']
        })).toEqual({
            title: 'test',
            url: 'test',
            tags: ['test','test']
        });
    });

    it('deleteBookmark should be called', function () {
        var scope = directive.scope;
        scope.bookmarks = [
            {
                id: 0,
                _id: {
                    $oid: ''
                },
                title: 'test',
                url: 'test',
                tags: ['test','test']
            }
        ];

        scope.deleteBookmark(0);
    });
});
