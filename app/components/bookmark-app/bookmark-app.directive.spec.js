describe('gt.components.bookmark-app', function () {
    var object;
    beforeEach(module('gt.components.bookmark-app', function($provide) {
        object = [{ name: 'value' }];
        $provide.factory('mongolabFactory', function($q) {
            return {
                'query': function() {
                    var fakePromise = $q.defer();
                    fakePromise.resolve(object);
                    return {$promise:fakePromise.promise};
                }
            };
        });
    }));

    var directive;
    beforeEach(inject(function ($compile, $rootScope, directiveBuilder) {
        directive = directiveBuilder.$build('<bookmark-app></bookmark-app>');
    }));

    it('tagsMap should be empty', function () {
        var scope = directive.element.isolateScope();

        expect(scope.tagsMap).toEqual({});
    });

    it('filter should be empty', function () {
        var scope = directive.element.isolateScope();
        scope.filterResults();        
    });

    it('editBookmarkCtr should be called', function () {
        var scope = directive.element.isolateScope();
        scope.ctrl.editBookmarkCtr();
    });
});
